pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Backend - Install') {
            steps {
                dir('backend') {
                    bat 'npm ci || npm install'
                }
            }
        }

        stage('Backend - Test') {
            steps {
                dir('backend') {
                    bat 'npm test'
                }
            }
        }

        stage('Frontend - Install') {
            steps {
                dir('frontend') {
                    bat 'npm ci || npm install'
                }
            }
        }

        stage('Frontend - Build') {
            steps {
                dir('frontend') {
                    bat 'npm run build'
                }
            }
        }

        stage('Archive Build') {
            steps {
                archiveArtifacts artifacts: 'frontend/dist/**', fingerprint: true
            }
        }
    }

    post {
        success {
            echo 'BUILD SUCCESSFUL - React frontend built and backend tests passed.'
        }
        failure {
            echo 'BUILD FAILED - Check the failed stage in Jenkins Console Output.'
        }
        always {
            echo 'Jenkins pipeline finished.'
        }
    }
}
