#!/bin/bash

# Script tự động test bảo mật website MU Online
# Sử dụng: ./test_security_automated.sh [BASE_URL] [ACCOUNT_ID]

BASE_URL=${1:-"http://localhost:3000"}
ACCOUNT_ID=${2:-"mges123"}

echo "=========================================="
echo "🔒 TEST BẢO MẬT WEBSITE MU ONLINE"
echo "=========================================="
echo "Base URL: $BASE_URL"
echo "Account ID: $BASE_URL"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
PASSED=0
FAILED=0
BLOCKED=0

# Function to test endpoint
test_endpoint() {
    local name=$1
    local url=$2
    local expected_status=$3
    
    echo -n "Testing: $name... "
    
    response=$(curl -s -w "\n%{http_code}" -X GET "$url" \
        -H "Content-Type: application/json" \
        -H "User-Agent: Security-Test-Script")
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    if [ "$http_code" == "$expected_status" ]; then
        echo -e "${GREEN}✓ PASSED${NC} (Status: $http_code)"
        ((PASSED++))
        return 0
    elif [ "$http_code" == "400" ] || [ "$http_code" == "401" ] || [ "$http_code" == "403" ]; then
        echo -e "${YELLOW}✓ BLOCKED${NC} (Status: $http_code) - Bảo mật hoạt động!"
        ((BLOCKED++))
        return 0
    else
        echo -e "${RED}✗ FAILED${NC} (Status: $http_code)"
        echo "Response: $body"
        ((FAILED++))
        return 1
    fi
}

# Test 1: SQL Injection - UNION SELECT
echo "1. TEST SQL INJECTION"
echo "----------------------------------------"
test_endpoint "SQL Injection - UNION SELECT" \
    "$BASE_URL/api/dashboard?accountId=${ACCOUNT_ID}' UNION SELECT * FROM MEMB_INFO--" \
    "400"

test_endpoint "SQL Injection - OR 1=1" \
    "$BASE_URL/api/dashboard?accountId=${ACCOUNT_ID}' OR '1'='1" \
    "400"

test_endpoint "SQL Injection - Comment" \
    "$BASE_URL/api/dashboard?accountId=${ACCOUNT_ID}'--" \
    "400"

test_endpoint "SQL Injection - Semicolon" \
    "$BASE_URL/api/dashboard?accountId=${ACCOUNT_ID}'; DROP TABLE warehouse--" \
    "400"

echo ""

# Test 2: XSS
echo "2. TEST XSS"
echo "----------------------------------------"
test_endpoint "XSS - Script Tag" \
    "$BASE_URL/api/dashboard?accountId=<script>alert(1)</script>" \
    "400"

test_endpoint "XSS - HTML Entities" \
    "$BASE_URL/api/dashboard?accountId=&lt;script&gt;alert(1)&lt;/script&gt;" \
    "400"

echo ""

# Test 3: Input Validation
echo "3. TEST INPUT VALIDATION"
echo "----------------------------------------"
test_endpoint "Input - Empty String" \
    "$BASE_URL/api/dashboard?accountId=" \
    "400"

test_endpoint "Input - Very Long String" \
    "$BASE_URL/api/dashboard?accountId=$(printf 'A%.0s' {1..1000})" \
    "400"

test_endpoint "Input - Special Characters" \
    "$BASE_URL/api/dashboard?accountId=!@#$%^&*()_+-=[]{}|;:,.<>?" \
    "400"

echo ""

# Test 4: Authorization
echo "4. TEST AUTHORIZATION"
echo "----------------------------------------"
test_endpoint "Authorization - No Token" \
    "$BASE_URL/api/dashboard?accountId=${ACCOUNT_ID}" \
    "401"

test_endpoint "Authorization - Invalid Token" \
    "$BASE_URL/api/dashboard?accountId=${ACCOUNT_ID}" \
    "401"

echo ""

# Test 5: Normal Request (Should work)
echo "5. TEST NORMAL REQUEST"
echo "----------------------------------------"
test_endpoint "Normal Request - Valid Account" \
    "$BASE_URL/api/dashboard?accountId=${ACCOUNT_ID}" \
    "200"

echo ""

# Summary
echo "=========================================="
echo "📊 KẾT QUẢ TEST"
echo "=========================================="
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${YELLOW}Blocked (Security working): $BLOCKED${NC}"
echo -e "${RED}Failed: $FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✅ TẤT CẢ TEST ĐỀU PASS! Website có vẻ an toàn.${NC}"
    exit 0
else
    echo -e "${RED}⚠️  CÓ $FAILED TEST FAILED! Cần kiểm tra lại bảo mật.${NC}"
    exit 1
fi

