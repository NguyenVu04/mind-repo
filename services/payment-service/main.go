package main

import (
	_ "payment-service/docs"

	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @title           Payment Service API
// @version         1.0
// @description     API cho payment service
// @host            localhost:8084
// @BasePath        /api/v1
func main() {
	r := gin.Default()

	// Swagger UI route
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	r.Run(":8084")
}
