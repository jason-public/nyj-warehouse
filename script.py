
import json
import re

# PDF에서 추출한 데이터를 구조화
raw_data = """
1	㈜엘엑스판토스	이용호	경기도 남양주시 화도읍 경춘로2247번길 8	1	13251.45	0	0	0	2013-03-11	02-3771-2336
2	씨제이대한통운㈜	신영수, 민영학	경기도 남양주시 진건읍 진건오남로 414	1	2000	0	0	0	2013-03-11	031-570-1354
3	씨제이대한통운㈜	신영수, 민영학	경기도 남양주시 수동면 비룡로 940	1	5542	0	0	0	2013-03-11	031-547-1309
4	롯데글로벌로지스㈜	강병구	경기도 남양주시 진접읍 양진로 962	1	3564	0	0	0	2013-03-11	031-529-9321
5	㈜화인로지텍	원경연	경기도 남양주시 수동면 비룡로 958	2	4024	1	1040	0	2013-03-11	031-594-7533
6	㈜로지비	김영광	경기도 남양주시 화도읍 폭포로 137-45, 화도물류센터	1	1223	0	0	0	2019-08-21	010-9442-8613
7	씨제이대한통운㈜	신영수, 민영학	경기도 남양주시 오남읍 양지로46번길 145	2	1044	0	0	0	2020-01-10	031-570-1354
8	씨제이대한통운㈜	신영수, 민영학	경기도 남양주시 진건읍 독정로231번길 38	3	1339	0	0	0	2020-09-02	010-9352-9745
9	씨제이대한통운㈜	신영수, 민영학	경기도 남양주시 진접읍 진벌로 60	2	3488	0	0	0	2021-03-19	031-594-1213
10	씨제이대한통운㈜	신영수, 민영학	경기도 남양주시 화도읍 재재기로 100-14	1	1499	0	0	0	2021-05-31	031-570-1356
11	씨제이대한통운㈜	신영수, 민영학	경기도 남양주시 진접읍 장현로 27	1	2687.74	0	0	0	2022-06-20	02-2046-9532
12	쿠팡로지스틱스서비스(유)	이선승, 홍용준, 김정현, 강현오	경기도 남양주시 별내면 청학로 83	1	1927	0	0	0	2022-08-31	-
13	쿠팡로지스틱스서비스(유)	이선승, 홍용준, 김정현, 강현오	경기도 남양주시 진접읍 금강로 1281번길 24-1, 1,3층, 지하1~3층	1	17566.08	0	0	0	2022-08-31	-
14	쿠팡로지스틱스서비스(유)	이선승, 홍용준, 김정현, 강현오	경기도 남양주시 화도읍 재재기로149번길 57, 1,3,4층	1	30532.06	0	0	0	2022-08-31	-
15	씨제이대한통운㈜	신영수, 민영학	경기도 남양주시 진건읍 독정로성지2길 36, 1층	1	1753	0	0	0	2022-08-31	031-960-6545
16	오뚜기물류서비스㈜	한태준	경기도 남양주시 수동면 지둔로 191, 오뚜기물류서비스 남양주안전물류센터	2	16865.46	2	22860.7	0	2024-01-10	031-284-4066
17	쿠팡로지스틱스서비스(유)	이선승, 홍용준, 김정현, 강현오	경기도 남양주시 화도읍 경춘로 2362	1	4199.01	0	0	0	2024-03-19	02-1544-9898
18	㈜로지스밸리	김필립	경기도 남양주시 화도읍 마치로 306	0	0	1	3567	0	2024-03-25	031-283-9910
19	㈜컬리넥스트마일	이보영	경기도 남양주시 와부읍 석실로 349	1	1794.15	0	0	0	2024-04-02	070-4800-0335
20	㈜두핸즈 남양주지점	박찬재	경기도 남양주시 수동면 지둔로 191, 오뚜기물류서비스 남양주안전물류센터 3층	1	5292.3	0	0	0	2024-05-17	010-7355-3421
21	쿠팡로지스틱스서비스(유)	이선승, 홍용준, 김정현, 강현오	경기도 남양주시 화도읍 마치로 306, 1,2층	1	2977.07	0	0	0	2024-07-30	010-5133-2557
22	쿠팡로지스틱스서비스(유)	이선승, 홍용준, 김정현, 강현오	경기도 남양주시 화도읍 마치로 306, 3,4층	1	3801	0	0	0	2024-07-30	010-9631-1441
23	쿠팡로지스틱스서비스(유)	이선승, 홍용준, 김정현, 강현오	경기도 남양주시 진건읍 진관로 232, 232-1	2	1219.42	0	0	0	2025-01-20	010-3218-5686
24	쿠팡로지스틱스서비스(유)	이선승, 홍용준, 김정현, 강현오	경기도 남양주시 이패동 636 외 5필지	2	3454.48	0	0	0	2025-04-21	010-9631-1441
25	주식회사 블루로터스	허인숙, 장병강	경기도 남양주시 다산지금로 123번안길 41, 43, 45	3	1736.73	0	0	0	2025-06-30	010-3843-5382
26	쿠팡로지스틱스서비스(유)	이선승, 홍용준, 김정현, 강현오	경기도 남양주시 양지로 296	1	1664.66	0	0	0	2025-07-22	1544-9898
27	남북물류㈜	김봉수	경기도 남양주시 와부읍 고래산로 91	1	1350	0	0	0	2025-09-09	031-577-7272
"""

# 지역 분류 함수
def extract_region(address):
    # 읍면동 추출
    region_patterns = [
        r'화도읍', r'진건읍', r'수동면', r'진접읍', 
        r'별내면', r'오남읍', r'와부읍', r'이패동', r'다산'
    ]
    
    for pattern in region_patterns:
        if pattern in address:
            return pattern
    return "기타"

# 데이터 파싱
companies = []
lines = [line.strip() for line in raw_data.strip().split('\n') if line.strip()]

for line in lines:
    parts = line.split('\t')
    if len(parts) >= 11:
        company = {
            "id": int(parts[0]),
            "name": parts[1],
            "representative": parts[2],
            "address": parts[3],
            "region": extract_region(parts[3]),
            "general_warehouse_count": int(parts[4]),
            "general_warehouse_area": float(parts[5]),
            "cold_warehouse_count": int(parts[6]),
            "cold_warehouse_area": float(parts[7]),
            "storage_area": float(parts[8]),
            "registration_date": parts[9],
            "contact": parts[10]
        }
        companies.append(company)

# 전체 통계 계산
total_companies = len(companies)
total_general_warehouses = sum(c['general_warehouse_count'] for c in companies)
total_cold_warehouses = sum(c['cold_warehouse_count'] for c in companies)
total_general_area = sum(c['general_warehouse_area'] for c in companies)
total_cold_area = sum(c['cold_warehouse_area'] for c in companies)
total_area = total_general_area + total_cold_area

# 지역별 통계
regions = {}
for company in companies:
    region = company['region']
    if region not in regions:
        regions[region] = {
            "name": region,
            "companies": [],
            "total_companies": 0,
            "total_general_warehouses": 0,
            "total_cold_warehouses": 0,
            "total_general_area": 0,
            "total_cold_area": 0,
            "total_area": 0
        }
    
    regions[region]['companies'].append(company)
    regions[region]['total_companies'] += 1
    regions[region]['total_general_warehouses'] += company['general_warehouse_count']
    regions[region]['total_cold_warehouses'] += company['cold_warehouse_count']
    regions[region]['total_general_area'] += company['general_warehouse_area']
    regions[region]['total_cold_area'] += company['cold_warehouse_area']
    regions[region]['total_area'] = regions[region]['total_general_area'] + regions[region]['total_cold_area']

# 데이터 구조화
dashboard_data = {
    "summary": {
        "total_companies": total_companies,
        "total_warehouses": total_general_warehouses + total_cold_warehouses,
        "total_area": round(total_area, 2),
        "general_warehouses": total_general_warehouses,
        "general_area": round(total_general_area, 2),
        "cold_warehouses": total_cold_warehouses,
        "cold_area": round(total_cold_area, 2)
    },
    "companies": companies,
    "regions": list(regions.values())
}

print(f"총 업체 수: {total_companies}")
print(f"총 창고 동수: {total_general_warehouses + total_cold_warehouses}")
print(f"총 창고 면적: {total_area:.2f}㎡")
print(f"\n지역별 분류:")
for region_name, region_data in regions.items():
    print(f"  {region_name}: {region_data['total_companies']}개 업체")

# JSON 데이터 생성
json_data = json.dumps(dashboard_data, ensure_ascii=False, indent=2)
print(f"\n데이터 구조화 완료")
print(f"JSON 데이터 길이: {len(json_data)} 문자")
