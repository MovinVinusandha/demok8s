pipeline {
    agent any

    parameters {
        string(name: 'Version', defaultValue: 'latest', description: 'Version to build')
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                echo "build ${params.Version}..."
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
                echo "testing ${params.Version}..."
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
                echo "deploying ${params.Version}..."
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