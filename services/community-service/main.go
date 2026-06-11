package main

import (
	_ "community-service/docs"

	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @title           Community Service API
// @version         1.0
// @description     API cho community service
// @host            localhost:8083
// @BasePath        /api/v1
func main() {
	r := gin.Default()

	// Swagger UI route
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	r.Run(":8083")
}
