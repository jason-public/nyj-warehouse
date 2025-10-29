const { useState, useMemo } = React;

// 상호명 리스트
const companyNames = [
  '㈜엘엑스판토스',
  '씨제이대한통운㈜',
  '롯데글로벌로지스㈜',
  '㈜화인로지텍',
  '㈜로지비',
  '쿠팡로지스틱스서비스(유)',
  '오뚜기물류서비스㈜',
  '㈜로지스밸리',
  '㈜컬리넥스트마일',
  '㈜두핸즈 남양주지점',
  '주식회사 블루로터스',
  '남북물류㈜'
];

// 전체 업체 데이터
const companiesData = [
  {
    id: 1,
    name: '㈜엘엑스판토스',
    ceo: '이용호',
    address: '화도읍 경춘로2247번길 8',
    region: '화도읍',
    generalWarehouse: { count: 1, area: 13251.45 },
    coldWarehouse: { count: 0, area: 0 },
    storageArea: 0,
    registrationDate: '2013-03-11',
    phone: '02-3771-2336'
  },
  {
    id: 2,
    name: '씨제이대한통운㈜',
    ceo: '신영수, 민영학',
    address: '진건읍 진건오남로 414',
    region: '진건읍',
    generalWarehouse: { count: 1, area: 2000 },
    coldWarehouse: { count: 0, area: 0 },
    storageArea: 0,
    registrationDate: '2013-03-11',
    phone: '031-570-1354'
  },
  {
    id: 3,
    name: '씨제이대한통운㈜',
    ceo: '신영수, 민영학',
    address: '수동면 비룡로 940',
    region: '수동면',
    generalWarehouse: { count: 1, area: 5542 },
    coldWarehouse: { count: 0, area: 0 },
    storageArea: 0,
    registrationDate: '2013-03-11',
    phone: '031-547-1309'
  },
  {
    id: 4,
    name: '롯데글로벌로지스㈜',
    ceo: '강병구',
    address: '진접읍 양진로 962',
    region: '진접읍',
    generalWarehouse: { count: 1, area: 3564 },
    coldWarehouse: { count: 0, area: 0 },
    storageArea: 0,
    registrationDate: '2013-03-11',
    phone: '031-529-9321'
  },
  {
    id: 5,
    name: '㈜화인로지텍',
    ceo: '원경연',
    address: '수동면 비룡로 958',
    region: '수동면',
    generalWarehouse: { count: 2, area: 4024 },
    coldWarehouse: { count: 1, area: 1040 },
    storageArea: 0,
    registrationDate: '2013-03-11',
    phone: '031-594-7533'
  },
  {
    id: 6,
    name: '㈜로지비',
    ceo: '김영광',
    address: '화도읍 폭포로 137-45',
    region: '화도읍',
    generalWarehouse: { count: 1, area: 1223 },
    coldWarehouse: { count: 0, area: 0 },
    storageArea: 0,
    registrationDate: '2019-08-21',
    phone: '010-9442-8613'
  },
  {
    id: 7,
    name: '씨제이대한통운㈜',
    ceo: '신영수, 민영학',
    address: '오남읍 양지로46번길 145',
    region: '오남읍',
    generalWarehouse: { count: 2, area: 1044 },
    coldWarehouse: { count: 0, area: 0 },
    storageArea: 0,
    registrationDate: '2020-01-10',
    phone: '031-570-1354'
  },
  {
    id: 8,
    name: '씨제이대한통운㈜',
    ceo: '신영수, 민영학',
    address: '진건읍 독정로231번길 38',
    region: '진건읍',
    generalWarehouse: { count: 3, area: 1339 },
    coldWarehouse: { count: 0, area: 0 },
    storageArea: 0,
    registrationDate: '2020-09-02',
    phone: '010-9352-9745'
  },
  {
    id: 9,
    name: '씨제이대한통운㈜',
    ceo: '신영수, 민영학',
    address: '진접읍 진벌로 60',
    region: '진접읍',
    generalWarehouse: { count: 2, area: 3488 },
    coldWarehouse: { count: 0, area: 0 },
    storageArea: 0,
    registrationDate: '2021-03-19',
    phone: '031-594-1213'
  },
  {
    id: 10,
    name: '씨제이대한통운㈜',
    ceo: '신영수, 민영학',
    address: '화도읍 재재기로 100-14',
    region: '화도읍',
    generalWarehouse: { count: 1, area: 1499 },
    coldWarehouse: { count: 0, area: 0 },
    storageArea: 0,
    registrationDate: '2021-05-31',
    phone: '031-570-1356'
  },
  {
    id: 11,
    name: '씨제이대한통운㈜',
    ceo: '신영수, 민영학',
    address: '진접읍 장현로 27',
    region: '진접읍',
    generalWarehouse: { count: 1, area: 2687.74 },
    coldWarehouse: { count: 0, area: 0 },
    storageArea: 0,
    registrationDate: '2022-06-20',
    phone: '02-2046-9532'
  },
  {
    id: 12,
    name: '쿠팡로지스틱스서비스(유)',
    ceo: '이선승, 홍용준, 김정현, 강현오',
    address: '별내면 청학로 83',
    region: '별내면',
    generalWarehouse: { count: 1, area: 1927 },
    coldWarehouse: { count: 0, area: 0 },
    storageArea: 0,
    registrationDate: '2022-08-31',
    phone: ''
  },
  {
    id: 13,
    name: '쿠팡로지스틱스서비스(유)',
    ceo: '이선승, 홍용준, 김정현, 강현오',
    address: '진접읍 금강로 1281번길 24-1',
    region: '진접읍',
    generalWarehouse: { count: 1, area: 17566.08 },
    coldWarehouse: { count: 0, area: 0 },
    storageArea: 0,
    registrationDate: '2022-08-31',
    phone: ''
  },
  {
    id: 14,
    name: '쿠팡로지스틱스서비스(유)',
    ceo: '이선승, 홍용준, 김정현, 강현오',
    address: '화도읍 재재기로149번길 57',
    region: '화도읍',
    generalWarehouse: { count: 1, area: 30532.06 },
    coldWarehouse: { count: 0, area: 0 },
    storageArea: 0,
    registrationDate: '2022-08-31',
    phone: ''
  },
  {
    id: 15,
    name: '씨제이대한통운㈜',
    ceo: '신영수, 민영학',
    address: '진건읍 독정로성지2길 36',
    region: '진건읍',
    generalWarehouse: { count: 1, area: 1753 },
    coldWarehouse: { count: 0, area: 0 },
    storageArea: 0,
    registrationDate: '2022-08-31',
    phone: '031-960-6545'
  },
  {
    id: 16,
    name: '오뚜기물류서비스㈜',
    ceo: '한태준',
    address: '수동면 지둔로 191',
    region: '수동면',
    generalWarehouse: { count: 2, area: 16865.46 },
    coldWarehouse: { count: 2, area: 22860.7 },
    storageArea: 0,
    registrationDate: '2024-01-10',
    phone: '031-284-4066'
  },
  {
    id: 17,
    name: '쿠팡로지스틱스서비스(유)',
    ceo: '이선승, 홍용준, 김정현, 강현오',
    address: '화도읍 경춘로 2362',
    region: '화도읍',
    generalWarehouse: { count: 1, area: 4199.01 },
    coldWarehouse: { count: 0, area: 0 },
    storageArea: 0,
    registrationDate: '2024-03-19',
    phone: '02-1544-9898'
  },
  {
    id: 18,
    name: '㈜로지스밸리',
    ceo: '김필립',
    address: '화도읍 마치로 306',
    region: '화도읍',
    generalWarehouse: { count: 0, area: 0 },
    coldWarehouse: { count: 1, area: 3567 },
    storageArea: 0,
    registrationDate: '2024-03-25',
    phone: '031-283-9910'
  },
  {
    id: 19,
    name: '㈜컬리넥스트마일',
    ceo: '이보영',
    address: '와부읍 석실로 349',
    region: '와부읍',
    generalWarehouse: { count: 1, area: 1794.15 },
    coldWarehouse: { count: 0, area: 0 },
    storageArea: 0,
    registrationDate: '2024-04-02',
    phone: '070-4800-0335'
  },
  {
    id: 20,
    name: '㈜두핸즈 남양주지점',
    ceo: '박찬재',
    address: '수동면 지둔로 191',
    region: '수동면',
    generalWarehouse: { count: 1, area: 5292.3 },
    coldWarehouse: { count: 0, area: 0 },
    storageArea: 0,
    registrationDate: '2024-05-17',
    phone: '010-7355-3421'
  },
  {
    id: 21,
    name: '쿠팡로지스틱스서비스(유)',
    ceo: '이선승, 홍용준, 김정현, 강현오',
    address: '화도읍 마치로 306 1,2층',
    region: '화도읍',
    generalWarehouse: { count: 1, area: 2977.07 },
    coldWarehouse: { count: 0, area: 0 },
    storageArea: 0,
    registrationDate: '2024-07-30',
    phone: '010-5133-2557'
  },
  {
    id: 22,
    name: '쿠팡로지스틱스서비스(유)',
    ceo: '이선승, 홍용준, 김정현, 강현오',
    address: '화도읍 마치로 306 3,4층',
    region: '화도읍',
    generalWarehouse: { count: 1, area: 3801 },
    coldWarehouse: { count: 0, area: 0 },
    storageArea: 0,
    registrationDate: '2024-07-30',
    phone: '010-9631-1441'
  },
  {
    id: 23,
    name: '쿠팡로지스틱스서비스(유)',
    ceo: '이선승, 홍용준, 김정현, 강현오',
    address: '진건읍 진관로 232',
    region: '진건읍',
    generalWarehouse: { count: 2, area: 1219.42 },
    coldWarehouse: { count: 0, area: 0 },
    storageArea: 0,
    registrationDate: '2025-01-20',
    phone: '010-3218-5686'
  },
  {
    id: 24,
    name: '쿠팡로지스틱스서비스(유)',
    ceo: '이선승, 홍용준, 김정현, 강현오',
    address: '이패동 636 외 5필지',
    region: '이패동',
    generalWarehouse: { count: 2, area: 3454.48 },
    coldWarehouse: { count: 0, area: 0 },
    storageArea: 0,
    registrationDate: '2025-04-21',
    phone: '010-9631-1441'
  },
  {
    id: 25,
    name: '주식회사 블루로터스',
    ceo: '허인숙, 장병강',
    address: '다산 다산지금로 123번안길 41, 43, 45',
    region: '다산',
    generalWarehouse: { count: 3, area: 1736.73 },
    coldWarehouse: { count: 0, area: 0 },
    storageArea: 0,
    registrationDate: '2025-06-30',
    phone: '010-3843-5382'
  },
  {
    id: 26,
    name: '쿠팡로지스틱스서비스(유)',
    ceo: '이선승, 홍용준, 김정현, 강현오',
    address: '양지로 296',
    region: '오남읍',
    generalWarehouse: { count: 1, area: 1664.66 },
    coldWarehouse: { count: 0, area: 0 },
    storageArea: 0,
    registrationDate: '2025-07-22',
    phone: '1544-9898'
  },
  {
    id: 27,
    name: '남북물류㈜',
    ceo: '김봉수',
    address: '와부읍 고래산로 91',
    region: '와부읍',
    generalWarehouse: { count: 1, area: 1350 },
    coldWarehouse: { count: 0, area: 0 },
    storageArea: 0,
    registrationDate: '2025-09-09',
    phone: '031-577-7272'
  }
];

const regions = ['화도읍', '진건읍', '수동면', '진접읍', '오남읍', '별내면', '와부읍', '이패동', '다산'];

// 아이콘 컴포넌트
const WarehouseIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const CompanyIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const SnowflakeIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v20m0-20l-4 4m4-4l4 4m-4 16l-4-4m4 4l4-4M2 12h20M2 12l4-4m-4 4l4 4m16-4l-4-4m4 4l-4 4" />
  </svg>
);

const MapIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>
);

// 요약 카드 컴포넌트
const SummaryCard = ({ title, value, unit, icon, gradientClass }) => (
  <div className={`${gradientClass} rounded-xl shadow-lg p-6 text-white card-hover`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm opacity-90 mb-1">{title}</p>
        <p className="text-3xl font-bold">
          {typeof value === 'number' ? value.toLocaleString('ko-KR') : value}
          <span className="text-lg ml-1">{unit}</span>
        </p>
      </div>
      <div className="opacity-80">
        {icon}
      </div>
    </div>
  </div>
);

// 테이블 컴포넌트
const CompanyTable = ({ companies, title }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
    <div className="px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600">
      <h2 className="text-xl font-bold text-white">{title}</h2>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">번호</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">상호 및 대표자</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">소재지</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">일반창고<br/>(동수/면적㎡)</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">냉동창고<br/>(동수/면적㎡)</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">등록일</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">연락처</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {companies.map((company, index) => (
            <tr key={company.id} className="table-row-hover">
              <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
              <td className="px-4 py-3">
                <div className="text-sm font-semibold text-gray-900">{company.name}</div>
                <div className="text-xs text-gray-500">{company.ceo}</div>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">{company.address}</td>
              <td className="px-4 py-3 text-sm text-gray-900">
                {company.generalWarehouse.count > 0 ? (
                  <div>
                    <span className="font-semibold">{company.generalWarehouse.count}동</span>
                    <span className="text-gray-500"> / </span>
                    <span>{company.generalWarehouse.area.toLocaleString('ko-KR')}㎡</span>
                  </div>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </td>
              <td className="px-4 py-3 text-sm text-gray-900">
                {company.coldWarehouse.count > 0 ? (
                  <div>
                    <span className="font-semibold">{company.coldWarehouse.count}동</span>
                    <span className="text-gray-500"> / </span>
                    <span>{company.coldWarehouse.area.toLocaleString('ko-KR')}㎡</span>
                  </div>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">{company.registrationDate}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{company.phone || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// 메인 앱 컴포넌트
const App = () => {
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);

  // 전체 통계 계산
  const totalStats = useMemo(() => {
    const stats = {
      totalCompanies: companiesData.length,
      totalWarehouses: 0,
      totalArea: 0,
      generalWarehouses: 0,
      generalArea: 0,
      coldWarehouses: 0,
      coldArea: 0
    };

    companiesData.forEach(company => {
      stats.totalWarehouses += company.generalWarehouse.count + company.coldWarehouse.count;
      stats.totalArea += company.generalWarehouse.area + company.coldWarehouse.area;
      stats.generalWarehouses += company.generalWarehouse.count;
      stats.generalArea += company.generalWarehouse.area;
      stats.coldWarehouses += company.coldWarehouse.count;
      stats.coldArea += company.coldWarehouse.area;
    });

    return stats;
  }, []);

  // 선택된 지역의 업체 필터링
  const filteredCompanies = useMemo(() => {
    if (selectedRegions.length === 0) return [];
    return companiesData.filter(company => selectedRegions.includes(company.region));
  }, [selectedRegions]);

  // 선택된 지역의 통계
  const regionStats = useMemo(() => {
    if (selectedRegions.length === 0) return null;

    const stats = {
      totalCompanies: filteredCompanies.length,
      totalWarehouses: 0,
      totalArea: 0,
      generalWarehouses: 0,
      generalArea: 0,
      coldWarehouses: 0,
      coldArea: 0
    };

    filteredCompanies.forEach(company => {
      stats.totalWarehouses += company.generalWarehouse.count + company.coldWarehouse.count;
      stats.totalArea += company.generalWarehouse.area + company.coldWarehouse.area;
      stats.generalWarehouses += company.generalWarehouse.count;
      stats.generalArea += company.generalWarehouse.area;
      stats.coldWarehouses += company.coldWarehouse.count;
      stats.coldArea += company.coldWarehouse.area;
    });

    return stats;
  }, [filteredCompanies]);

  // 지역 체크박스 토글
  const toggleRegion = (region) => {
    setSelectedRegions(prev => {
      if (prev.includes(region)) {
        return prev.filter(r => r !== region);
      } else {
        return [...prev, region];
      }
    });
  };

  // 상호 체크박스 토글
  const toggleCompany = (companyName) => {
    setSelectedCompanies(prev => {
      if (prev.includes(companyName)) {
        return prev.filter(c => c !== companyName);
      } else {
        return [...prev, companyName];
      }
    });
  };

  // 선택된 상호의 업체 필터링
  const filteredByCompanies = useMemo(() => {
    if (selectedCompanies.length === 0) return [];
    return companiesData.filter(company => selectedCompanies.includes(company.name));
  }, [selectedCompanies]);

  // 선택된 상호의 통계
  const companyStats = useMemo(() => {
    if (selectedCompanies.length === 0) return null;

    const stats = {
      totalCompanies: filteredByCompanies.length,
      totalWarehouses: 0,
      totalArea: 0,
      generalWarehouses: 0,
      generalArea: 0,
      coldWarehouses: 0,
      coldArea: 0
    };

    filteredByCompanies.forEach(company => {
      stats.totalWarehouses += company.generalWarehouse.count + company.coldWarehouse.count;
      stats.totalArea += company.generalWarehouse.area + company.coldWarehouse.area;
      stats.generalWarehouses += company.generalWarehouse.count;
      stats.generalArea += company.generalWarehouse.area;
      stats.coldWarehouses += company.coldWarehouse.count;
      stats.coldArea += company.coldWarehouse.area;
    });

    return stats;
  }, [filteredByCompanies]);

  // 상호별로 그룹화된 데이터
  const groupedByCompany = useMemo(() => {
    if (selectedCompanies.length === 0) return [];
    
    const grouped = [];
    selectedCompanies.forEach(companyName => {
      const companyLocations = filteredByCompanies.filter(c => c.name === companyName);
      if (companyLocations.length > 0) {
        grouped.push({
          companyName,
          locations: companyLocations
        });
      }
    });
    return grouped;
  }, [selectedCompanies, filteredByCompanies]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-12">
      {/* 헤더 */}
      <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center">남양주시 물류창고 현황 대시보드</h1>
          <p className="text-center mt-2 text-indigo-100">지역별, 업체별 물류창고 현황 조회</p>
        </div>
      </header>

      <div className="container mx-auto px-4 mt-8">
        {/* 전체 현황 요약 카드 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">전체 현황 요약</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <SummaryCard
              title="전체 업체 수"
              value={totalStats.totalCompanies}
              unit="개"
              icon={<CompanyIcon />}
              gradientClass="gradient-bg-1"
            />
            <SummaryCard
              title="전체 창고 동수"
              value={totalStats.totalWarehouses}
              unit="동"
              icon={<WarehouseIcon />}
              gradientClass="gradient-bg-2"
            />
            <SummaryCard
              title="전체 창고 면적"
              value={totalStats.totalArea.toFixed(2)}
              unit="㎡"
              icon={<MapIcon />}
              gradientClass="gradient-bg-3"
            />
            <SummaryCard
              title="일반창고"
              value={`${totalStats.generalWarehouses}동 / ${totalStats.generalArea.toFixed(2)}㎡`}
              unit=""
              icon={<WarehouseIcon />}
              gradientClass="gradient-bg-4"
            />
            <SummaryCard
              title="냉동창고"
              value={`${totalStats.coldWarehouses}동 / ${totalStats.coldArea.toFixed(2)}㎡`}
              unit=""
              icon={<SnowflakeIcon />}
              gradientClass="gradient-bg-5"
            />
          </div>
        </div>

        {/* 전체 업체 현황 테이블 */}
        <div className="mb-8">
          <CompanyTable companies={companiesData} title="전체 업체 현황" />
        </div>

        {/* 지역별 필터 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <MapIcon />
            <span className="ml-2">지역별 현황 필터</span>
          </h2>
          <p className="text-gray-600 mb-4">조회하고 싶은 지역을 선택하세요 (다중 선택 가능)</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {regions.map(region => {
              const isSelected = selectedRegions.includes(region);
              const regionCount = companiesData.filter(c => c.region === region).length;
              return (
                <label
                  key={region}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50 shadow-md'
                      : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleRegion(region)}
                    className="checkbox-custom w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                  />
                  <span className={`ml-3 font-semibold ${
                    isSelected ? 'text-indigo-700' : 'text-gray-700'
                  }`}>
                    {region}
                    <span className="block text-xs text-gray-500 mt-1">{regionCount}개 업체</span>
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* 선택된 지역 현황 */}
        {selectedRegions.length > 0 && regionStats && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              선택된 지역 현황 ({selectedRegions.join(', ')})
            </h2>
            
            {/* 선택된 지역 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              <SummaryCard
                title="선택 지역 업체 수"
                value={regionStats.totalCompanies}
                unit="개"
                icon={<CompanyIcon />}
                gradientClass="gradient-bg-1"
              />
              <SummaryCard
                title="선택 지역 창고 동수"
                value={regionStats.totalWarehouses}
                unit="동"
                icon={<WarehouseIcon />}
                gradientClass="gradient-bg-2"
              />
              <SummaryCard
                title="선택 지역 창고 면적"
                value={regionStats.totalArea.toFixed(2)}
                unit="㎡"
                icon={<MapIcon />}
                gradientClass="gradient-bg-3"
              />
              <SummaryCard
                title="일반창고"
                value={`${regionStats.generalWarehouses}동 / ${regionStats.generalArea.toFixed(2)}㎡`}
                unit=""
                icon={<WarehouseIcon />}
                gradientClass="gradient-bg-4"
              />
              <SummaryCard
                title="냉동창고"
                value={`${regionStats.coldWarehouses}동 / ${regionStats.coldArea.toFixed(2)}㎡`}
                unit=""
                icon={<SnowflakeIcon />}
                gradientClass="gradient-bg-5"
              />
            </div>

            {/* 선택된 지역 업체 테이블 */}
            <CompanyTable 
              companies={filteredCompanies} 
              title={`선택된 지역 업체 목록 (총 ${filteredCompanies.length}개)`} 
            />
          </div>
        )}

        {/* 지역 미선택 메시지 */}
        {selectedRegions.length === 0 && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-blue-800 font-semibold">
                지역을 선택하시면 해당 지역의 상세 현황을 확인하실 수 있습니다.
              </p>
            </div>
          </div>
        )}

        {/* 상호별 필터 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <CompanyIcon />
            <span className="ml-2">상호별 현황 필터</span>
          </h2>
          <p className="text-gray-600 mb-4">조회하고 싶은 상호를 선택하세요 (다중 선택 가능)</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {companyNames.map(companyName => {
              const isSelected = selectedCompanies.includes(companyName);
              const companyCount = companiesData.filter(c => c.name === companyName).length;
              return (
                <label
                  key={companyName}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-purple-500 bg-purple-50 shadow-md'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleCompany(companyName)}
                    className="checkbox-custom w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                  />
                  <span className={`ml-3 font-semibold text-sm ${
                    isSelected ? 'text-purple-700' : 'text-gray-700'
                  }`}>
                    {companyName}
                    <span className="block text-xs text-gray-500 mt-1">{companyCount}개 위치</span>
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* 선택된 상호 현황 */}
        {selectedCompanies.length > 0 && companyStats && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              선택된 상호 현황 ({selectedCompanies.join(', ')})
            </h2>
            
            {/* 선택된 상호 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              <SummaryCard
                title="선택 상호 위치 수"
                value={companyStats.totalCompanies}
                unit="개"
                icon={<CompanyIcon />}
                gradientClass="gradient-bg-1"
              />
              <SummaryCard
                title="선택 상호 창고 동수"
                value={companyStats.totalWarehouses}
                unit="동"
                icon={<WarehouseIcon />}
                gradientClass="gradient-bg-2"
              />
              <SummaryCard
                title="선택 상호 창고 면적"
                value={companyStats.totalArea.toFixed(2)}
                unit="㎡"
                icon={<MapIcon />}
                gradientClass="gradient-bg-3"
              />
              <SummaryCard
                title="일반창고"
                value={`${companyStats.generalWarehouses}동 / ${companyStats.generalArea.toFixed(2)}㎡`}
                unit=""
                icon={<WarehouseIcon />}
                gradientClass="gradient-bg-4"
              />
              <SummaryCard
                title="냉동창고"
                value={`${companyStats.coldWarehouses}동 / ${companyStats.coldArea.toFixed(2)}㎡`}
                unit=""
                icon={<SnowflakeIcon />}
                gradientClass="gradient-bg-5"
              />
            </div>

            {/* 상호별로 그룹화된 테이블 */}
            <div className="space-y-6">
              {groupedByCompany.map(group => (
                <div key={group.companyName} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-600">
                    <h3 className="text-xl font-bold text-white">
                      {group.companyName} ({group.locations.length}개 위치)
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">번호</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">대표자</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">소재지</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">일반창고<br/>(동수/면적㎡)</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">냉동창고<br/>(동수/면적㎡)</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">등록일</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">연락처</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {group.locations.map((location, index) => (
                          <tr key={location.id} className="table-row-hover">
                            <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{location.ceo}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{location.address}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {location.generalWarehouse.count > 0 ? (
                                <div>
                                  <span className="font-semibold">{location.generalWarehouse.count}동</span>
                                  <span className="text-gray-500"> / </span>
                                  <span>{location.generalWarehouse.area.toLocaleString('ko-KR')}㎡</span>
                                </div>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {location.coldWarehouse.count > 0 ? (
                                <div>
                                  <span className="font-semibold">{location.coldWarehouse.count}동</span>
                                  <span className="text-gray-500"> / </span>
                                  <span>{location.coldWarehouse.area.toLocaleString('ko-KR')}㎡</span>
                                </div>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">{location.registrationDate}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{location.phone || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 상호 미선택 메시지 */}
        {selectedCompanies.length === 0 && selectedRegions.length === 0 && (
          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg mt-8">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-purple-800 font-semibold">
                상호를 선택하시면 해당 상호의 모든 위치 및 상세 현황을 확인하실 수 있습니다.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// 앱 렌더링
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
