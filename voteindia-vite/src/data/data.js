export const PARTIES = [
  { id: 1, name: "Bharatiya Janata Party", abbr: "BJP", symbol: "🪷", color: "#FF9933", bg: "rgba(255,153,51,0.15)", candidates: ["Narendra Modi", "Amit Shah", "Rajnath Singh"], seats: 303, alliance: "NDA", founded: 1980, leader: "Narendra Modi", ideology: "Nationalism, Conservatism, Hindutva", agenda: { economy: ["Make in India 2.0", "₹5 Lakh Crore infrastructure investment", "PM Mudra Yojana expansion"], security: ["Strong national defence", "Zero tolerance for terrorism", "Border security modernization"], social: ["Uniform Civil Code", "One Nation One Election", "Digital India 2.0"], agriculture: ["PM Kisan 3.0 – ₹12,000/year", "MSP guarantee for 20 crops", "Kisan Drone initiative"] } },
  { id: 2, name: "Indian National Congress", abbr: "INC", symbol: "✋", color: "#138808", bg: "rgba(19,136,8,0.15)", candidates: ["Rahul Gandhi", "Mallikarjun Kharge", "Priyanka Gandhi"], seats: 52, alliance: "INDIA", founded: 1885, leader: "Mallikarjun Kharge", ideology: "Social Democracy, Secularism, Liberalism", agenda: { economy: ["30-day employment guarantee", "Income support ₹8,500/month to poor", "Caste census and OBC reservation"], security: ["Dialogue-first foreign policy", "Cyber security task force", "Police reforms"], social: ["Women Reservation Bill implementation", "LGBTQ+ rights protection", "RTI strengthening"], agriculture: ["Loan waiver up to ₹2 Lakh", "Fair MSP as per Swaminathan report", "Crop insurance reforms"] } },
  { id: 3, name: "Aam Aadmi Party", abbr: "AAP", symbol: "🧹", color: "#0077b6", bg: "rgba(0,119,182,0.15)", candidates: ["Arvind Kejriwal", "Bhagwant Mann", "Manish Sisodia"], seats: 22, alliance: "INDIA", founded: 2012, leader: "Arvind Kejriwal", ideology: "Anti-corruption, Populism, Good Governance", agenda: { economy: ["Free electricity up to 300 units", "Free water 20kl per month", "Mohalla clinic national rollout"], security: ["CCTV in every street", "Women marshal on public transport", "Police accountability board"], social: ["Free quality education for all", "Government school revolution", "Free health clinics nationwide"], agriculture: ["Zero commission on mandi sales", "Direct payment to farmers", "Soil health card expansion"] } },
  { id: 4, name: "Samajwadi Party", abbr: "SP", symbol: "🚲", color: "#e63946", bg: "rgba(230,57,70,0.15)", candidates: ["Akhilesh Yadav", "Ram Gopal Yadav", "Dimple Yadav"], seats: 37, alliance: "INDIA", founded: 1992, leader: "Akhilesh Yadav", ideology: "Democratic Socialism, Social Justice, Secularism", agenda: { economy: ["Expressway and industry corridor in UP", "MSME boost ₹1 Lakh crore fund", "Youth entrepreneurship scheme"], security: ["Communal harmony taskforce", "Fair policing reforms", "Dalit-minority protection laws"], social: ["OBC census and reservation expansion", "SP Laptop Scheme 2.0", "Free smartphone for girls"], agriculture: ["Sugarcane price hike to ₹450 per quintal", "Irrigation scheme expansion", "Kisan card 0% loan"] } },
  { id: 5, name: "Trinamool Congress", abbr: "TMC", symbol: "🌸", color: "#06d6a0", bg: "rgba(6,214,160,0.15)", candidates: ["Mamata Banerjee", "Abhishek Banerjee", "Derek O Brien"], seats: 29, alliance: "INDIA", founded: 1998, leader: "Mamata Banerjee", ideology: "Regional Nationalism, Populism, Federalism", agenda: { economy: ["Lakshmir Bhandar scheme expansion", "Duare Sarkar camp nationwide", "Industrial corridor in Bengal"], security: ["Women safety rapid response", "Anti-drug taskforce", "Border area development"], social: ["Kanyashree 3.0", "Samabyathi scheme for disabled", "Student credit card scheme"], agriculture: ["Banglar Bari housing for farmers", "Kisan Mela support", "Cold storage expansion"] } },
  { id: 6, name: "Bahujan Samaj Party", abbr: "BSP", symbol: "🐘", color: "#9333ea", bg: "rgba(147,51,234,0.15)", candidates: ["Mayawati", "Satish Mishra", "Ram Achal Rajbhar"], seats: 10, alliance: "None", founded: 1984, leader: "Mayawati", ideology: "Ambedkarism, Social Justice, Anti-caste", agenda: { economy: ["SC/ST entrepreneurship fund", "Reservation in private sector", "Dalit development corporation"], security: ["Anti-atrocity law enforcement", "SC/ST protection force", "Cyber crime cell for minorities"], social: ["Ambedkar memorial in every district", "Education fund for Dalit students", "Inter-caste marriage incentive"], agriculture: ["Land rights for Dalits", "Farm loan waiver for SC/ST", "Community farming cooperatives"] } },
];

export const ELECTIONS = [
  { id: 1, title: "18th Lok Sabha General Elections 2024", type: "General", date: "2024-04-19", phases: 7, seats: 543, status: "closed", result: "NDA – 293 seats" },
  { id: 2, title: "Bihar Vidhan Sabha Elections 2025", type: "State", date: "2025-10-15", phases: 3, seats: 243, status: "closed", result: "JDU+BJP – 159 seats" },
  { id: 3, title: "Delhi Assembly Elections 2025", type: "State", date: "2025-02-05", phases: 1, seats: 70, status: "closed", result: "AAP – 42 seats" },
  { id: 4, title: "West Bengal Panchayat Elections 2025", type: "Local", date: "2025-07-08", phases: 1, seats: 8343, status: "upcoming", result: "" },
  { id: 5, title: "Uttar Pradesh By-elections 2026", type: "By-election", date: "2026-03-28", phases: 1, seats: 9, status: "active", result: "" },
  { id: 6, title: "Tamil Nadu Urban Local Body 2026", type: "Local", date: "2026-05-10", phases: 1, seats: 1234, status: "upcoming", result: "" },
];

export const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu & Kashmir", "Ladakh",
];

export const CANDIDATES_UP = [
  { id: 1, name: "Yogi Adityanath", party: "BJP", symbol: "🪷", color: "#FF9933", votes: 34820 },
  { id: 2, name: "Akhilesh Yadav", party: "SP", symbol: "🚲", color: "#e63946", votes: 28540 },
  { id: 3, name: "Rahul Gandhi", party: "INC", symbol: "✋", color: "#138808", votes: 12380 },
  { id: 4, name: "Mayawati", party: "BSP", symbol: "🐘", color: "#9333ea", votes: 8920 },
  { id: 5, name: "Arvind Kejriwal", party: "AAP", symbol: "🧹", color: "#0077b6", votes: 4120 },
];
