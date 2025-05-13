Features

- CRUD (Create, Read, Update, Delete) operations
- Express.js and MongoDB integration
- Dockerized and deployed with Kubernetes
- Exposed using a NodePort service

Tech Stack

- Node.js
- Express.js
- MongoDB
- Docker
- Kubernetes

Project Structure

```

.
├── server.js                 # Main Node.js application file
├── Dockerfile               # Docker build instructions
├── nodejs-deployment.yaml  # Deployment and service for Node.js app
├── mongodb-deployment.yaml # Deployment and service for MongoDB
└── README.md

````

Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/nodejs-k8s-crud.git
cd nodejs-k8s-crud
````

### 2. Build and Push Docker Image

Replace `<your-dockerhub-username>` with your Docker Hub username:

```bash
docker build -t <your-dockerhub-username>/node-crud-app .
docker push <your-dockerhub-username>/node-crud-app
```

### 3. Deploy to Kubernetes

Apply the Kubernetes manifests:

```bash
kubectl apply -f mongodb-deployment.yaml
kubectl apply -f nodejs-deployment.yaml
```

### 4. Access the Application

Use port-forwarding to access the Node.js API locally:

```bash
kubectl port-forward svc/nodejs-service 8080:80
```

Now open your browser or API tool:

```
http://localhost:8080/items
```

Example API Requests

* **Get all items**

  ```
  GET http://localhost:8080/items
  ```

* **Create a new item**

  ```bash
  curl -X POST http://localhost:8080/items \
       -H "Content-Type: application/json" \
       -d '{"name": "Test Item", "description": "This is a test"}'
  ```

* **Get item by ID**

  ```
  GET http://localhost:8080/items/<item-id>
  ```

* **Update item**

  ```bash
  curl -X PUT http://localhost:8080/items/<item-id> \
       -H "Content-Type: application/json" \
       -d '{"name": "Updated Name"}'
  ```

* **Delete item**

  ```
  DELETE http://localhost:8080/items/<item-id>
  ```
