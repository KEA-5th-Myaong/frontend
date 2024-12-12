pipeline {
    agent any

    environment {
        registryCredential = 'docker-hub' // Docker Hub에 로그인할 때 사용할 자격 증명 ID
        dockerImage = '' // Docker 이미지 변수 초기화
        imageName = "popolog-frontend" // 이미지 이름
    }

    stages {
        stage('Setup Credentials') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'docker-hub-username', variable: 'DOCKER_HUB_USERNAME'),
                                     string(credentialsId: 'onprem-server-username', variable: 'ONPREM_SERVER_USERNAME'),
                                     string(credentialsId: 'onprem-server-ip', variable: 'ONPREM_SERVER_IP')]) {
                        // 환경 변수 설정
                        env.dockerHubUsername = DOCKER_HUB_USERNAME
                        env.fullImageName = "${env.dockerHubUsername}/${env.imageName}" // fullImageName 설정
                        env.onpremServerUsername = ONPREM_SERVER_USERNAME
                        env.onpremServerIp = ONPREM_SERVER_IP
                    }
                }
            }
        }

        stage('Cloning Repository') {
            steps {
                echo 'Cloning Repository'
                git url: 'https://github.com/KEA-5th-Myaong/frontend.git',
                    branch: 'main', // 적절한 브랜치로 변경
                    credentialsId: 'github-token'
            }
        }

        stage('Build & Push Docker Image') {
            steps {
                echo 'Building and Pushing Docker Image'
                script {
                    def previousBuildId = "${env.BUILD_ID.toInteger() - 1}"
                    def newBuildId = "${env.BUILD_ID.toInteger()}"

                    // 새로운 이미지 빌드 및 푸시
                    dockerImage = docker.build("${env.fullImageName}:${newBuildId}")
                    docker.withRegistry('', registryCredential) {
                        dockerImage.push()
                    }

                    // 이전 빌드 ID 태그 이미지 삭제
                    sh "docker rmi ${env.fullImageName}:${previousBuildId} || true"
                }
            }
        }

        stage('Docker Run') {
            steps {
                echo 'Pull Docker Image & Docker Image Run'
                sshagent (credentials: ['onprem-ssh']) {
                    // 1. 컨테이너가 존재하는 경우 삭제
                    sh """
                        ssh -o StrictHostKeyChecking=no ${env.onpremServerUsername}@${env.onpremServerIp} '
                        if [ \$(docker ps -q --filter name=${env.imageName}) ]; then
                            docker rm -f ${env.imageName} || true
                        fi
                        '
                    """

                    // 2. 새로 빌드한 이미지를 실행
                    sh """
                        ssh -o StrictHostKeyChecking=no ${env.onpremServerUsername}@${env.onpremServerIp} '
                        docker run -d --name ${env.imageName} -p 3000:3000 ${env.fullImageName}:latest
                        '
                    """
                }
            }
        }
    }

    post {
        success {
            slackSend(channel: '#jenkins', color: '#00FF00', message: """:white_check_mark: 온프레미스 CI/CD 파이프라인 성공 : ${env.JOB_NAME} [${env.BUILD_NUMBER}] 확인 : (${env.BUILD_URL})""")
        }

        failure {
            slackSend(channel: '#jenkins', color: '#FF0000', message: """:octagonal_sign: 온프레미스 CI/CD 파이프라인 실패 : ${env.JOB_NAME} [${env.BUILD_NUMBER}] 확인 : (${env.BUILD_URL})""")
        }
    }
}
