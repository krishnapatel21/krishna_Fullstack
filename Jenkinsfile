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
                    bat 'npm install'
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

       stage('Backend - Start') {
    steps {
        dir('backend') {
            bat '''
                start "" /B cmd /C "npm start > backend.log 2>&1"
            '''
        }
    }
}

        stage('Frontend - Install') {
            steps {
                dir('frontend') {
                    bat 'npm install'
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

        stage('Frontend - Start') {
            steps {
                dir('frontend') {
                    bat '''
                        start "Frontend Server" /B cmd /C "npm run preview -- --host 0.0.0.0 > frontend.log 2>&1"
                        timeout /T 5 /NOBREAK
                    '''
                }
            }
        }

        stage('Verify') {
            steps {
                bat '''
                    echo =====================================
                    echo Backend and Frontend started
                    echo =====================================
                    echo Backend:  http://localhost:5000
                    echo Frontend: http://localhost:4173
                    echo =====================================
                '''
            }
        }
    }

    post {
        success {
            echo 'BUILD SUCCESSFUL!'
            echo 'Backend installed, tested and started.'
            echo 'Frontend installed, built and started.'
        }

        failure {
            echo 'BUILD FAILED!'
            echo 'Check the failed stage in Console Output.'
        }

        always {
            archiveArtifacts artifacts: 'frontend/dist/**', fingerprint: true
        }
    }
}
