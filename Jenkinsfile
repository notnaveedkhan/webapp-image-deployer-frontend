pipeline {

    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('docker-creds')
        APPLICATION_NAME = 'waidk8-frontend'
        DOCKER_IMAGE_TAG_NAME = "${DOCKERHUB_CREDENTIALS_USR}/${APPLICATION_NAME}"
        DOCKER_IMAGE_BUILD_TAG_NAME = "${DOCKER_IMAGE_TAG_NAME}:${BUILD_NUMBER}"
        DOCKER_IMAGE_LATEST_TAG_NAME = "${DOCKER_IMAGE_TAG_NAME}:latest"
    }

    stages {
        stage('Docker Login') {
            steps {
                sh 'echo ' + DOCKERHUB_CREDENTIALS_PSW + ' | docker login -u ' + DOCKERHUB_CREDENTIALS_USR + ' --password-stdin'
            }
        }
        stage('Docker Build') {
            steps {
                sh 'docker build -t ' + DOCKER_IMAGE_BUILD_TAG_NAME + ' -t  ' + DOCKER_IMAGE_LATEST_TAG_NAME + ' .'
            }
        }
        stage('Docker Push') {
            steps {
                sh 'docker push ' + DOCKER_IMAGE_BUILD_TAG_NAME
                sh 'docker push ' + DOCKER_IMAGE_LATEST_TAG_NAME
            }
        }
        stage('Stop Container') {
            steps {
                sh 'docker stop ' + APPLICATION_NAME + ' || true'
            }
        }
        stage('Remove Old Image') {
            steps {
                script {
                    for (int i = ((BUILD_NUMBER as int) - 1); i >= 0; i--) {
                        sh 'docker rmi ' + DOCKER_IMAGE_TAG_NAME + ':' + i + ' || true'
                    }
                }
            }
        }
        stage('Deploy Container') {
            steps {
                script {
                    if (JOB_BASE_NAME.contains('dev-')) {
                        sh 'docker run -d --rm -p 80:80 --name ' + APPLICATION_NAME + ' ' + DOCKER_IMAGE_LATEST_TAG_NAME
                    }
                    if (JOB_BASE_NAME.contains('prod-')) {
                        sh 'docker run -d --rm -p 80:80 --name ' + APPLICATION_NAME + ' ' + DOCKER_IMAGE_LATEST_TAG_NAME
                    }
                }
            }
        }
        stage('Docker Logout') {
            steps {
                sh 'docker logout'
            }
        }
    }
}