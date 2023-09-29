for i in {1..15}; do
    curl -i --location 'http://localhost:3000/take/get/user/123'
    echo "\n"
done