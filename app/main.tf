resource "kubernetes_deployment" "web" {
    metadata {
      name = "web-deployment"
    }
    spec {
      replicas = 2
      selector {
        match_labels = { app = "my-web"}
      }
      template {
        metadata {
          labels = { app = "my-web"}
        }
        spec {
          container {
            image = var.image_url
            name = "web-container"
            port {
              container_port = 80
            }
          }
        }
      }
    }
  
}

resource "kubernetes_service" "web_svc" {
  metadata {
    name = "web-service"
  }
  spec {
    selector = { app = "my-web"}
    port {
      port = 80
      target_port = 80
    }
    type = "LoadBalancer"
  }
}