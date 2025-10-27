# 🎯 MIGRACIÓN SIGE-PAE-FRONT - FRONTEND ANGULAR

## 📋 **ANÁLISIS DEL PROYECTO**

### **🔍 INFORMACIÓN TÉCNICA**
- **Framework**: Angular 12.2.0
- **Nombre**: sige-pae-front
- **Build**: Angular CLI con soporte para producción
- **Containerización**: ✅ Dockerfile incluido (Node 14.17.0 + Nginx 1.20.1)

### **🌐 CONFIGURACIÓN ACTUAL DE APIs**
El frontend está configurado para consumir APIs desde `core.sipae.gov.co`:

```typescript
// environment.ts (ORIGEN)
apiURI_Acceso: 'https://core.sipae.gov.co/sige-pae-acceso-api/api/'
baseUrlAPI_Acceso: 'https://core.sipae.gov.co/sispae-api-acceso/api/'
baseUrlAPI_Alertas: 'https://core.sipae.gov.co/sispae-api-alertas/api/'
// ... más APIs
```

---

## 🎯 **PLAN DE MIGRACIÓN**

### **Opción 1: Actualizar URLs a LoadBalancer (INMEDIATO)**
```typescript
// environment.ts (DESTINO)
baseUrlAPI_Acceso: 'http://4.155.92.235/api/'
// Para otras APIs cuando se migren:
// baseUrlAPI_Alertas: 'http://[NUEVA_IP]/api/'
```

### **Opción 2: Actualizar URLs a Application Gateway (FUTURO)**
```typescript
// environment.ts (DESTINO - CON DOMAIN)
baseUrlAPI_Acceso: 'http://4.155.9.34/api/'
// Con dominio personalizado:
// baseUrlAPI_Acceso: 'https://api.sipae.local/acceso/api/'
```

---

## 🔧 **CONFIGURACIÓN NECESARIA**

### **1. Actualizar Environments**
```bash
# Archivos a modificar:
src/environments/environment.ts      # Desarrollo
src/environments/environment.prod.ts # Producción
```

### **2. Configurar CORS en APIs**
Verificar que las APIs migradas permitan requests desde el dominio del frontend.

### **3. Actualizar Docker Build**
```dockerfile
# Actualizar Dockerfile si es necesario
FROM node:16-alpine as build-step  # Actualizar versión Node
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod

FROM nginx:1.22-alpine  # Actualizar versión Nginx
COPY --from=build-step /app/dist/SIGE-PAE-Front /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf  # Configuración NGINX
EXPOSE 80
```

---

## 🚀 **DESPLIEGUE EN AZURE**

### **Opción A: Azure Container Instances (Rápido)**
```bash
# Build y push a ACR
docker build -t azrcaksalimentosdev.azurecr.io/sige-pae-front:latest .
docker push azrcaksalimentosdev.azurecr.io/sige-pae-front:latest

# Deploy en ACI
az container create \
  --resource-group SIPAE-DEV \
  --name sige-pae-front \
  --image azrcaksalimentosdev.azurecr.io/sige-pae-front:latest \
  --registry-login-server azrcaksalimentosdev.azurecr.io \
  --ip-address public \
  --ports 80
```

### **Opción B: Azure Kubernetes Service (Recomendado)**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: sige-pae-front
  namespace: alimentos-dev
spec:
  replicas: 2
  selector:
    matchLabels:
      app: sige-pae-front
  template:
    metadata:
      labels:
        app: sige-pae-front
    spec:
      containers:
      - name: sige-pae-front
        image: azrcaksalimentosdev.azurecr.io/sige-pae-front:latest
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: sige-pae-front-service
  namespace: alimentos-dev
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 80
  selector:
    app: sige-pae-front
```

### **Opción C: Azure Static Web Apps (Frontend Only)**
```bash
# Para deployment directo sin Docker
npm run build --prod
# Deploy dist/ a Azure Static Web Apps
```

---

## 📋 **PASOS INMEDIATOS**

### **1. Actualizar Configuración**
- [x] Revisar environment.ts actual
- [ ] Actualizar URLs de API Acceso
- [ ] Configurar CORS en backend
- [ ] Testing local

### **2. Build y Containerización**
- [ ] Actualizar Dockerfile
- [ ] Build imagen Docker
- [ ] Push a ACR
- [ ] Testing contenedor

### **3. Deployment**
- [ ] Deploy en AKS/ACI
- [ ] Configurar LoadBalancer/Ingress
- [ ] Testing end-to-end
- [ ] Documentar acceso

---

## 🔗 **INTEGRACIÓN CON API MIGRADA**

### **Estado Actual**
✅ **API Acceso**: `http://4.155.92.235` (LoadBalancer)
🔧 **Frontend**: Necesita actualización de URLs

### **Testing E2E**
```bash
# 1. Verificar API
curl http://4.155.92.235/api/health

# 2. Actualizar frontend config
# 3. Build y deploy frontend
# 4. Testing integración completa
```

---

## 📊 **PRÓXIMOS PASOS**

1. **🔧 Configurar URLs**: Actualizar environment.ts
2. **🐳 Containerizar**: Build Docker image  
3. **☸️ Deploy AKS**: Deployment en Kubernetes
4. **🌐 Configurar Ingress**: Application Gateway o LoadBalancer
5. **🧪 Testing**: Verificación end-to-end
6. **📚 Documentar**: Guías de acceso y operación

**¿Proceder con la migración del frontend?** 🚀