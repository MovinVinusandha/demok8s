pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'echo "Simulating build process..."'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
                sh 'echo "Simulating test process..."'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
                sh 'echo "Simulating deployment process..."'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            sh 'echo "Simulating cleanup process..."'
        }
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed!'    
        }
    }
}