
pipeline {
    agent any

    stages {
        stage('Preparar Workspace') {
            steps {
                echo 'Limpiando workspace...'
                deleteDir()
            }
        }

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/agustinmend/QAII-WDIO.git'
            }
        }

        stage('Instalar dependencias') {
            steps {
                bat 'npm install'
            }
        }

        stage('Ejecutar WDIO') {
            steps {
                echo 'Ejecutando pruebas WebdriverIO...'
                bat 'npx wdio run wdio.conf.js'
            }
        }
    }

    post {
        always {
            echo 'Publicando resultados Allure...'

            script {
                if (fileExists('allure-results')) {
                    allure(
                        commandline: 'Allure',
                        includeProperties: false,
                        reportBuildPolicy: 'ALWAYS',
                        results: [[path: 'allure-results']]
                    )
                } else {
                    echo 'No se encontró allure-results.'
                }
            }

            echo 'Pipeline finalizada.'
        }
    }
}
