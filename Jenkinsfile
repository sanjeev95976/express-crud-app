pipeline {
    agent any

    tools {
        nodejs 'NodeJS-22'
    }

    stages {

        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t express-crud:jenkins .'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker rm -f express-crud-app || true
                    docker run -d \
                      --name express-crud-app \
                      -p 3001:3000 \
                      express-crud:jenkins
                '''
            }
        }
    }
}