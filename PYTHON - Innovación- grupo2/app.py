# ==========================================
# VETVIEW - APP STREAMLIT (PASO 2)
# SISTEMA DE PREDICCIÓN DE ANOMALÍAS
# GRUPO 2 - SECCIÓN 25367
# ==========================================

import streamlit as st
import pandas as pd
import numpy as np
import joblib
import plotly.graph_objects as go
import plotly.express as px
from datetime import datetime
import os

# ==========================================
# CONFIGURACIÓN DE LA PÁGINA
# ==========================================
st.set_page_config(
    page_title="VETVIEW - Predicción de Anomalías",
    page_icon="🐾",
    layout="centered",
    initial_sidebar_state="expanded"
)

# ==========================================
# FUNCIONES DE CARGA
# ==========================================
@st.cache_resource
def cargar_modelo():
    """Carga el modelo entrenado y su información."""
    try:
        modelo = joblib.load('modelos/vetview_modelo_completo.pkl')
        info = joblib.load('modelos/info_modelo.pkl')
        return modelo, info
    except FileNotFoundError:
        # Intentar cargar desde la raíz si no está en modelos/
        try:
            modelo = joblib.load('vetview_modelo_completo.pkl')
            info = joblib.load('info_modelo.pkl')
            return modelo, info
        except FileNotFoundError:
            st.error("""
            ❌ **No se encontró el modelo**
            
            Ejecuta primero `vetview_ml.py` para generar:
            - `vetview_modelo_completo.pkl`
            - `info_modelo.pkl`
            
            O asegúrate de que los archivos estén en la carpeta `modelos/`
            """)
            return None, None

# ==========================================
# CARGA DEL MODELO
# ==========================================
modelo, info = cargar_modelo()

if modelo is None:
    st.stop()

# ==========================================
# SIDEBAR - INFORMACIÓN DEL MODELO
# ==========================================
with st.sidebar:
    # Logo
    try:
        st.image("assets/logo.png", width=100)
    except:
        st.image("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNSCR9nPa_677ijQvePoHC9yJgu4dn-pcuPtdb_QkCGxbNx4Ss0q4Mfluw&s=10", width=80)
    
    st.title("VETERINARIA NORTH")
    st.caption("Monitoreo Inteligente")
    
    st.divider()
    
    # Métricas del modelo
    st.markdown("### 📊 Rendimiento del Modelo")
    
    col1, col2 = st.columns(2)
    with col1:
        st.metric("F1 Score", f"{info['f1_score']:.3f}")
        st.metric("Recall", f"{info['recall']:.3f}")
    with col2:
        st.metric("Precisión", f"{info['precision']:.3f}")
        st.metric("Accuracy", f"{info['accuracy']:.3f}")
    
    st.caption(f"**Modelo:** {info['nombre']}")
    
    st.divider()
    
    # Aviso importante
    st.warning("""
    **⚠️ IMPORTANTE**
    
    Esta es una herramienta de **apoyo**.
    La decisión final siempre debe ser
    del veterinario responsable.
    """)
    
    st.divider()
    
    # Fecha y hora
    st.caption(f"🕐 {datetime.now().strftime('%d/%m/%Y %H:%M')}")
    st.caption("🐾 VETVIEW v1.0")

# ==========================================
# PANTALLA PRINCIPAL
# ==========================================
st.title("🐾 VETERINARIA NORTH")
st.subheader("Detección de Comportamientos Anómalos")
st.markdown("""
Ingresa los datos del paciente para obtener una predicción en tiempo real.
El sistema analizará los datos de los sensores IoT y determinará si el comportamiento es normal o anómalo.
""")

st.divider()

# ==========================================
# FORMULARIO DE ENTRADA
# ==========================================
st.markdown("### 📝 Datos del paciente")

with st.container(border=True):
    # Columnas principales
    col1, col2 = st.columns(2)
    
    with col1:
        # Tipo de servicio
        tipo_servicio = st.selectbox(
            "🏥 Tipo de Servicio",
            options=["Hospitalizacion", "Bano"],
            help="Selecciona el tipo de servicio que recibe la mascota",
            index=0
        )
        
        # Duración
        duracion = st.number_input(
            "⏱️ Duración (minutos)",
            min_value=5,
            max_value=3000,
            value=120,
            step=10,
            help="Tiempo total del servicio en minutos"
        )
        
        # Movimiento (slider)
        movimiento = st.slider(
            "🏃 Movimiento (%)",
            min_value=0,
            max_value=100,
            value=50,
            step=1,
            help="Porcentaje de tiempo en movimiento detectado por los sensores"
        )
    
    with col2:
        # Quietud
        quietud = st.number_input(
            "😴 Quietud (minutos)",
            min_value=0,
            max_value=2000,
            value=45,
            step=5,
            help="Tiempo sin movimiento detectado en minutos"
        )
        
        # Vocalización
        vocalizacion = st.number_input(
            "🔊 Vocalización (minutos)",
            min_value=0,
            max_value=70,
            value=15,
            step=1,
            help="Tiempo de vocalizaciones (ladridos/llantos) en minutos"
        )
        
        # Ratio calculado automáticamente
        ratio = quietud / duracion if duracion > 0 else 0
        st.metric(
            label="📊 Ratio de Inactividad Clínica",
            value=f"{ratio:.4f}",
            help="Relación entre tiempo en quietud y duración total del servicio"
        )

# ==========================================
# RESULTADO DEL ANÁLISIS PRELIMINAR
# ==========================================
# Mostrar valores de referencia según el tipo de servicio
with st.expander("📋 Ver valores de referencia por tipo de servicio"):
    if tipo_servicio == "Baño":
        st.markdown("""
        **Valores de referencia para BAÑO:**
        - Duración típica: 20 - 80 minutos
        - Movimiento normal: 40 - 80%
        - Vocalización normal: < 5 minutos
        - Ratio de inactividad normal: < 0.2
        
        **⚠️ Se considera ANÓMALO cuando:**
        - Vocalización > 10 minutos Y Movimiento < 20%
        - Ratio > 0.5 (quietud excesiva)
        """)
    else:
        st.markdown("""
        **Valores de referencia para HOSPITALIZACIÓN:**
        - Duración típica: 120 - 3000 minutos
        - Movimiento normal: 20 - 60%
        - Vocalización normal: < 10 minutos
        - Ratio de inactividad normal: < 0.3
        
        **⚠️ Se considera ANÓMALO cuando:**
        - Vocalización > 10 minutos Y Movimiento < 20%
        - Ratio > 0.5 (quietud excesiva)
        """)

# ==========================================
# BOTÓN DE PREDICCIÓN
# ==========================================
st.divider()

col_btn1, col_btn2, col_btn3 = st.columns([1, 2, 1])
with col_btn2:
    predecir = st.button(
        "🔮 Realizar Predicción",
        type="primary",
        use_container_width=True
    )

# ==========================================
# ESTADO INICIAL (Sin predicción)
# ==========================================
if not predecir:
    st.info("👈 Ingresa los datos del paciente y presiona **'Realizar Predicción'**")
    
    with st.expander("ℹ️ Ver ejemplo de paciente ANÓMALO"):
        st.markdown("""
        **Paciente con comportamiento anómalo:**
        
        | Variable | Valor |
        |----------|-------|
        | Tipo de Servicio | Hospitalización |
        | Duración | 120 min |
        | Movimiento | 5% (muy bajo) |
        | Quietud | 85 min (muy alto) |
        | Vocalización | 30 min (muy alto) |
        | Ratio | 0.7083 |
        
        **Resultado esperado:** 🚨 **ANÓMALO**
        """)
    
    with st.expander("ℹ️ Ver ejemplo de paciente NORMAL"):
        st.markdown("""
        **Paciente con comportamiento normal:**
        
        | Variable | Valor |
        |----------|-------|
        | Tipo de Servicio | Baño |
        | Duración | 45 min |
        | Movimiento | 65% |
        | Quietud | 10 min |
        | Vocalización | 2 min |
        | Ratio | 0.2222 |
        
        **Resultado esperado:** ✅ **NORMAL**
        """)

# ==========================================
# RESULTADO DE LA PREDICCIÓN
# ==========================================
if predecir:
    # Preparar datos para el modelo
    datos_paciente = pd.DataFrame({
        'tipo_servicio': [tipo_servicio],
        'duracion_servicio_min': [duracion],
        'nivel_movimiento_pct': [movimiento],
        'tiempo_quietud_min': [quietud],
        'tiempo_vocalizacion_min': [vocalizacion],
        'ratio_inactividad_clinica': [ratio]
    })
    
    # Realizar predicción
    with st.spinner("🔍 Analizando datos del paciente..."):
        try:
            prediccion = modelo.predict(datos_paciente)[0]
            probabilidades = modelo.predict_proba(datos_paciente)[0]
            prob_anomalo = probabilidades[1] * 100
            prob_normal = probabilidades[0] * 100
        except Exception as e:
            st.error(f"❌ Error al procesar la predicción: {e}")
            st.stop()
    
    st.divider()
    st.markdown("### 📊 Resultado de la Predicción")
    
    # ======================================
    # CASO 1: COMPORTAMIENTO ANÓMALO
    # ======================================
    if prediccion == 1:
        # Tarjeta de alerta
        st.error("🚨 **COMPORTAMIENTO ANÓMALO DETECTADO**")
        st.warning("⚠️ Se recomienda **intervención inmediata** por parte del personal veterinario.")
        
        # Métricas principales
        col_m1, col_m2, col_m3 = st.columns(3)
        with col_m1:
            st.metric(
                label="Nivel de Alerta",
                value="ALTA",
                delta="Anómalo",
                delta_color="inverse"
            )
        with col_m2:
            st.metric(
                label="Probabilidad de Anomalía",
                value=f"{prob_anomalo:.1f}%",
                delta=f"{prob_anomalo - 50:.1f}% sobre el umbral" if prob_anomalo > 50 else None
            )
        with col_m3:
            st.metric(
                label="Confianza del Modelo",
                value=f"{max(prob_anomalo, prob_normal):.1f}%"
            )
        
        # Acciones recomendadas
        with st.expander("📋 Acciones Recomendadas", expanded=True):
            st.markdown("""
            **Pasos a seguir:**
            
            1. 🔴 **Verificar inmediatamente** el estado físico de la mascota
            2. 📡 **Revisar datos en tiempo real** de los sensores IoT
            3. 📞 **Contactar al dueño** para informar la situación
            4. 📝 **Registrar la intervención** en el sistema
            5. 🏥 **Actualizar el historial clínico** del paciente
            
            **⚠️ No ignorar esta alerta.** El modelo ha detectado patrones que requieren atención.
            """)
        
        # Mostrar qué variables activaron la alerta
        with st.expander("🔍 ¿Por qué se activó la alerta?"):
            st.markdown("""
            El modelo detectó los siguientes factores de riesgo:
            
            | Factor | Valor | Interpretación |
            |--------|-------|----------------|
            | Movimiento | {}% | {} |
            | Vocalización | {} min | {} |
            | Ratio de Inactividad | {:.4f} | {} |
            """.format(
                movimiento,
                "⚠️ **Muy bajo** (< 20%)" if movimiento < 20 else "✅ Normal",
                vocalizacion,
                "⚠️ **Muy alto** (> 10 min)" if vocalizacion > 10 else "✅ Normal",
                ratio,
                "⚠️ **Excesivo** (> 0.5)" if ratio > 0.5 else "✅ Normal"
            ))
    
    # ======================================
    # CASO 2: COMPORTAMIENTO NORMAL
    # ======================================
    else:
        # Tarjeta de éxito
        st.success("✅ **COMPORTAMIENTO NORMAL**")
        st.info("ℹ️ El paciente se encuentra dentro de los parámetros clínicos esperados.")
        
        # Métricas principales
        col_m1, col_m2, col_m3 = st.columns(3)
        with col_m1:
            st.metric(
                label="Nivel de Alerta",
                value="BAJA",
                delta="Normal"
            )
        with col_m2:
            st.metric(
                label="Probabilidad de Normalidad",
                value=f"{prob_normal:.1f}%"
            )
        with col_m3:
            st.metric(
                label="Confianza del Modelo",
                value=f"{max(prob_anomalo, prob_normal):.1f}%"
            )
        
        # Recomendaciones
        with st.expander("📋 Recomendaciones", expanded=True):
            st.markdown("""
            **Seguir con el protocolo estándar:**
            
            1. ✅ **Continuar con monitoreo regular** según el plan establecido
            2. 📊 **Mantener registro de datos** para análisis histórico
            3. 🏥 **Seguir el protocolo de atención** definido para el servicio
            4. 📱 **Informar al dueño** que todo está dentro de lo esperado
            
            **El paciente no requiere intervención especial en este momento.**
            """)
    
    # ======================================
    # GRÁFICO DE PROBABILIDADES (SIEMPRE)
    # ======================================
    st.divider()
    st.subheader("📊 Análisis de Probabilidades")
    
    # Crear gráfico con Plotly
    fig = go.Figure()
    
    # Añadir barras
    fig.add_trace(go.Bar(
        x=['Normal', 'Anómalo'],
        y=[prob_normal, prob_anomalo],
        text=[f"{prob_normal:.1f}%", f"{prob_anomalo:.1f}%"],
        textposition='auto',
        marker_color=[
            '#2ecc71' if prediccion == 0 else '#bdc3c7',
            '#e74c3c' if prediccion == 1 else '#bdc3c7'
        ],
        textfont=dict(size=14, color='white'),
        hovertemplate='<b>%{x}</b><br>Probabilidad: %{y:.1f}%<extra></extra>'
    ))
    
    # Configurar layout
    fig.update_layout(
        height=300,
        margin=dict(l=40, r=40, t=40, b=40),
        showlegend=False,
        yaxis=dict(
            title="Probabilidad (%)",
            range=[0, 100],
            tickformat=".0f"
        ),
        xaxis=dict(
            title="Comportamiento",
            tickfont=dict(size=14)
        ),
        plot_bgcolor='rgba(0,0,0,0)',
        paper_bgcolor='rgba(0,0,0,0)'
    )
    
    # Mostrar gráfico
    st.plotly_chart(fig, use_container_width=True)
    
    # ======================================
    # RESUMEN DE DATOS INGRESADOS
    # ======================================
    with st.expander("📋 Ver datos completos del paciente"):
        df_mostrar = datos_paciente.T.reset_index()
        df_mostrar.columns = ['Variable', 'Valor']
        
        # Formatear valores
        df_mostrar['Valor'] = df_mostrar['Valor'].apply(
            lambda x: f"{x:.4f}" if isinstance(x, float) else str(x)
        )
        
        st.dataframe(
            df_mostrar,
            use_container_width=True,
            hide_index=True,
            column_config={
                "Variable": "Variable",
                "Valor": "Valor Ingresado"
            }
        )
        
        # Mostrar también la predicción
        st.markdown(f"""
        **Resultado de la predicción:** 
        {'🚨 ANÓMALO' if prediccion == 1 else '✅ NORMAL'}
        """)

# ==========================================
# FOOTER
# ==========================================
st.divider()

col_f1, col_f2, col_f3 = st.columns(3)
with col_f1:
    st.caption("🐾 VETVIEW v1.0")
with col_f2:
    st.caption(f"📊 Modelo: {info['nombre']}")
with col_f3:
    st.caption("📌 Proyecto Final - Innovación y Transformación Digital")

# Mostrar última actualización
st.caption(f"🔄 Última actualización: {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}")

# ==========================================
# FIN DEL CÓDIGO
# ==========================================