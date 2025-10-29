
# YAML 형식으로 데이터 준비 (앱 생성을 위해)
import yaml

# 요약 데이터만 간략하게 준비
summary_yaml = {
    "summary": {
        "total_companies": 27,
        "total_warehouses": 40,
        "total_area": 163262.31,
        "general_warehouses": 36,
        "general_area": 139361.61,
        "cold_warehouses": 4,
        "cold_area": 23900.7
    },
    "regions": [
        {"name": "화도읍", "companies": 8},
        {"name": "진건읍", "companies": 4},
        {"name": "수동면", "companies": 4},
        {"name": "진접읍", "companies": 4},
        {"name": "오남읍", "companies": 1},
        {"name": "별내면", "companies": 1},
        {"name": "와부읍", "companies": 2},
        {"name": "이패동", "companies": 1},
        {"name": "다산", "companies": 1}
    ]
}

yaml_output = yaml.dump(summary_yaml, allow_unicode=True, sort_keys=False)
print(yaml_output)
