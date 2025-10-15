#!/bin/bash

# Shopware credentials
SHOPWARE_URL="https://127.0.0.1:8000"
USERNAME="admin"
PASSWORD="shopware"

# Get access token
echo "Getting access token..."
TOKEN_RESPONSE=$(curl -s -X POST "${SHOPWARE_URL}/api/oauth/token" \
  -H "Content-Type: application/json" \
  -d "{
    \"grant_type\": \"password\",
    \"client_id\": \"administration\",
    \"username\": \"${USERNAME}\",
    \"password\": \"${PASSWORD}\"
  }" \
  -k)

ACCESS_TOKEN=$(echo $TOKEN_RESPONSE | grep -o '"access_token":"[^"]*' | grep -o '[^"]*$')

if [ -z "$ACCESS_TOKEN" ]; then
    echo "Failed to get access token"
    exit 1
fi

echo "Access token received: ${ACCESS_TOKEN:0:20}..."

# Category IDs
HOME_ID="01982124079a73c288e5b2249f1c4f55"
KOSZULKI_ID="0199e8228dbb71dc870c5a25ae970c19"
LONGSLEEVE_ID="0199e8488d4e74d999f372e5c5281c3e"
TOPY_ID="0199e86ff0ca7c99997c44cc164bf04d"
AKCESORIA_ID="0199e868d4837013b4d6609dd2d61da2"

# Tax ID (Standard rate 19%)
TAX_ID="019821240799723b8d1eb3c2e354d096"

# Product names and descriptions
declare -a PRODUCT_NAMES=(
    "Underground Rebel Tee"
    "Acid Wash Longsleeve"
    "Neon Grunge Tank"
    "Vintage Band Shirt"
    "Distressed Graphic Tee"
    "Rave Culture Top"
    "Electronic Beats Longsleeve"
    "Street Art Tank"
    "Dark Wave Shirt"
    "Cyberpunk Tee"
    "Industrial Strength Top"
    "Bass Drop Longsleeve"
    "Underground Scene Tank"
    "Techno Warrior Shirt"
    "Festival Vibes Tee"
    "Acid House Top"
    "Warehouse Party Longsleeve"
    "Club Culture Tank"
    "Sound System Shirt"
    "Rave Accessories Kit"
)

declare -a PRODUCT_DESCRIPTIONS=(
    "Express your underground rebellion with this iconic tee"
    "Long sleeve comfort meets acid wash style"
    "Neon-inspired tank top for the grunge aesthetic"
    "Classic vintage band merchandise style"
    "Heavily distressed graphic design for authentic wear"
    "Celebrate rave culture with this statement piece"
    "Electronic music inspired long sleeve design"
    "Street art meets fashion in this unique tank"
    "Dark wave aesthetic for the alternative scene"
    "Futuristic cyberpunk design elements"
    "Industrial strength construction and style"
    "Feel the bass drop in this comfortable longsleeve"
    "Represent the underground music scene"
    "Warrior-inspired design for techno enthusiasts"
    "Capture the festival energy with this vibrant tee"
    "Acid house tribute in wearable form"
    "Underground warehouse party aesthetic"
    "Club culture meets streetwear design"
    "Show your sound system loyalty"
    "Complete accessories kit for ravers"
)

# Function to generate random price between 25-85
generate_price() {
    echo $((RANDOM % 61 + 25))
}

# Function to select random category
select_category() {
    categories=($KOSZULKI_ID $LONGSLEEVE_ID $TOPY_ID $AKCESORIA_ID)
    echo ${categories[$RANDOM % ${#categories[@]}]}
}

echo "Starting to create 20 products..."

for i in {0..19}; do
    PRODUCT_NAME="${PRODUCT_NAMES[$i]}"
    PRODUCT_DESC="${PRODUCT_DESCRIPTIONS[$i]}"
    PRICE=$(generate_price)
    CATEGORY_ID=$(select_category)
    
    echo "Creating product $((i+1)): $PRODUCT_NAME (Price: €$PRICE)"
    
    # Create product
    RESPONSE=$(curl -s -X POST "${SHOPWARE_URL}/api/product" \
      -H "Authorization: Bearer $ACCESS_TOKEN" \
      -H "Content-Type: application/json" \
      -d "{
        \"name\": \"$PRODUCT_NAME\",
        \"productNumber\": \"RAVE-$(printf "%04d" $((i+1)))\",
        \"description\": \"$PRODUCT_DESC\",
        \"taxId\": \"$TAX_ID\",
        \"price\": [
          {
            \"currencyId\": \"b7d2554b0ce847cd82f3ac9bd1c0dfca\",
            \"gross\": $PRICE,
            \"net\": $(echo "scale=2; $PRICE / 1.19" | bc),
            \"linked\": true
          }
        ],
        \"stock\": $((RANDOM % 50 + 10)),
        \"categories\": [
          {
            \"id\": \"$CATEGORY_ID\"
          }
        ],
        \"visibilities\": [
          {
            \"salesChannelId\": \"98432def39fc4624b33213a56b8c944d\",
            \"visibility\": 30
          }
        ],
        \"active\": true
      }" \
      -k)
    
    # Check if creation was successful
    if echo "$RESPONSE" | grep -q '"id"'; then
        echo "✓ Product created successfully"
    else
        echo "✗ Failed to create product: $PRODUCT_NAME"
        echo "Response: $RESPONSE"
    fi
    
    # Small delay to avoid overwhelming the API
    sleep 0.5
done

echo "Finished creating products!"
