"use client";

import { useThaiGeoStore } from "@/src/stores/thaiGeo.store";
import { useUserStore } from "@/src/stores/user.store";
import {
  Box,
  Button,
  createTheme,
  Divider,
  Grid, // ใช้ Grid2 สำหรับ MUI v6/v7
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
  Typography,
  Chip,
} from "@mui/material";
import { border, padding, positions } from "@mui/system";
import html2pdf from "html2pdf.js";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";

// สร้าง Theme ที่ดูเป็นทางการและสะอาดตา
const professionalTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1a237e", // สีน้ำเงินเข้ม
    },
    secondary: {
      main: "#c62828",
    },
    background: {
      default: "#f8f9fa",
      paper: "#ffffff",
    },
    text: {
      primary: "#1c1c1c",
      secondary: "#5f6368",
    },
  },
  typography: {
    fontFamily: "'Sarabun', 'Inter', 'Arial', sans-serif",
    h4: { fontWeight: 800, letterSpacing: "-0.02em" },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 600 },
    body2: { lineHeight: 1.6 },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: "#ffffff",
          color: "#ffffff",
          fontWeight: "bold",
        },
      },
    },
  },
});

export default function EnhancedLoanSchedule() {
  const pdfRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const id = params.id as string;
  const { fetchUser, user } = useUserStore();
  const { data: session, status } = useSession();
  const {
    provinces,
    districts,
    subdistricts,
    fetchProvinces,
    fetchDistricts,
    fetchSubdistricts,
  } = useThaiGeoStore();
  const userData = user?.usersInformation;
  console.log("ID from path:", id);
  const documents = [
    {
      title: "สำเนาบัตรประชาชน",
      image:
        "https://res.cloudinary.com/dvtvwkwig/image/upload/v1769094943/uploads/c0sk2revtj2o6lmcslhc.webp",
    },
    {
      title: "สลิปเงินเดือน",
      image:
        "https://res.cloudinary.com/dvtvwkwig/image/upload/v1769094943/uploads/c0sk2revtj2o6lmcslhc.webp",
    },
    {
      title: "หนังสือรับรองการทำงาน",
      image:
        "https://res.cloudinary.com/dvtvwkwig/image/upload/v1769094943/uploads/c0sk2revtj2o6lmcslhc.webp",
    },
    {
      title: "สำเนาทะเบียนบ้าน",
      image:
        "https://res.cloudinary.com/dvtvwkwig/image/upload/v1769094943/uploads/c0sk2revtj2o6lmcslhc.webp",
    },
    {
      title: "สำเนาสมุดบัญชีธนาคาร",
      image:
        "https://res.cloudinary.com/dvtvwkwig/image/upload/v1769094943/uploads/c0sk2revtj2o6lmcslhc.webp",
    },
    {
      title: "เอกสารอื่นๆ",
      image:
        "https://res.cloudinary.com/dvtvwkwig/image/upload/v1769094943/uploads/c0sk2revtj2o6lmcslhc.webp",
    },
    // เพิ่มอีกกี่รูปก็ได้
  ];

  const downloadPDF = async () => {
    if (!pdfRef.current) return;
    const opt: any = {
      margin: 0,
      filename: "Loan_Repayment_Schedule.pdf",
      html2canvas: {
        scale: 4,
        useCORS: true,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
      pagebreak: {
        mode: ["css"],
      },
    };

    await html2pdf().from(pdfRef.current).set(opt).save();
  };
  // 1️⃣ fetch user ก่อน
  useEffect(() => {
    if (!id || !session?.user.backendToken) return;

    fetchUser(id, session.user.backendToken);
  }, [id, session?.user.backendToken]);

  // 2️⃣ เมื่อ user มาแล้ว → fetch จังหวัด
  useEffect(() => {
    if (!userData?.provinceCode) return;

    fetchProvinces(); // โหลด list จังหวัดก่อน (ถ้ายังไม่เคยโหลด)
    fetchDistricts(String(userData.provinceCode));
  }, [userData?.provinceCode]);

  // 3️⃣ เมื่อ district มาแล้ว → fetch ตำบล
  useEffect(() => {
    if (!userData?.districtCode) return;

    fetchSubdistricts(String(userData.districtCode));
  }, [userData?.districtCode]);

  const ITEMS_PER_PAGE = 6; // 2 col x 3 row

  const chunkArray = (arr: any[], size: number) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const documentPages = chunkArray(documents, ITEMS_PER_PAGE);

  // ข้อมูลจำลองที่ละเอียด
  const loanData = {
    company: {
      name: "Elite Fund ",
      address:
        "123 อาคารรุ่งเรือง ชั้น 15 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110",
      taxId: "0-1234-56789-01-2",
      phone: "02-123-4567",
      website: "www.EliteFound.co.th",
    },
    borrower: {
      name: "นายสมชาย ใจดี",
      idCard: "1-2345-67890-12-3",
      address: "45/1 หมู่ 2 ต.บางนา อ.บางนา จ.กรุงเทพฯ 10260",
      contractNo: "LF-2026-001",
      contractDate: "21 มกราคม 2026",
    },
    workDetail: {
      companyName: "Poontana",
      addressCompany:
        "123 อาคารรุ่งเรือง ชั้น 15 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110",
      position: "Programmer",
      salary: 40000,
      totalWork: "2 ปี",

      employment: "งานประจำ",
    },
    myBank: {
      bankName: "KTC",
      bankAccountNumber: "0123123123123",
      bankAccountName: "Nanthawat Inthisaen",
      bankBranch: "Bankkok",
      accountType: "ออมทรัยพ์",
      employment: "งานประจำ",
      debtInstallmentPerMonth: 2000,
      monthlyExpense: 2000000,
      monthlyIncome: 120000,
    },
    schedule: [
      {
        no: 1,
        date: "21 ก.พ. 2026",
        payment: 8560.75,
        principal: 8144.08,
        interest: 416.67,
        balance: 91855.92,
        status: "ชำระแล้ว",
      },
      {
        no: 2,
        date: "21 มี.ค. 2026",
        payment: 8560.75,
        principal: 8178.02,
        interest: 382.73,
        balance: 83677.9,
        status: "รอดำเนินการ",
      },
      {
        no: 3,
        date: "21 เม.ย. 2026",
        payment: 8560.75,
        principal: 8212.09,
        interest: 348.66,
        balance: 75465.81,
        status: "รอดำเนินการ",
      },
      {
        no: 4,
        date: "21 พ.ค. 2026",
        payment: 8560.75,
        principal: 8246.31,
        interest: 314.44,
        balance: 67219.5,
        status: "รอดำเนินการ",
      },
      {
        no: 5,
        date: "21 มิ.ย. 2026",
        payment: 8560.75,
        principal: 8280.67,
        interest: 280.08,
        balance: 58938.83,
        status: "รอดำเนินการ",
      },
      {
        no: 6,
        date: "21 ก.ค. 2026",
        payment: 8560.75,
        principal: 8315.17,
        interest: 245.58,
        balance: 50623.66,
        status: "รอดำเนินการ",
      },
    ],
  };

  const provinceName = provinces.find(
    (p) => p.code === userData?.provinceCode,
  )?.nameTh;

  const districtName = districts.find(
    (d) => d.code === userData?.districtCode,
  )?.nameTh;

  const subdistrictName = subdistricts.find(
    (s) => s.code === userData?.subdistrictCode,
  )?.nameTh;

  const pdfData = user &&
    userData && {
      borrower: {
        name: `${userData.firstName} ${userData.lastName}`,
        idCard: userData.citizenId,
        address: `${userData.currentAddress} ต.${subdistrictName} อ.${districtName} จ.${provinceName} ${userData.zipcode}`,
        // contractDate: userData?.createAt,
        image: userData.id_card_image,
      },

      workDetail: {
        companyName: userData.JobDetail?.companyName,
        position: userData.JobDetail?.position,
        addressCompany: userData.JobDetail?.companyAddress,
        salary: userData.JobDetail?.salaryPerMonth?.toLocaleString(),
        totalWork: `${userData.JobDetail?.workYears} ปี`,
        employment: userData.JobDetail?.employmentType,
      },

      myBank: {
        bankName: userData.bankInformation?.bankName,
        bankAccountName: userData.bankInformation?.bankAccountName,
        bankAccountNumber: userData.bankInformation?.bankAccountNumber,
        bankBranch: userData.bankInformation?.bankBranch,
        accountType: userData.bankInformation?.accountType,
        monthlyExpense:
          userData.bankInformation?.monthlyExpense?.toLocaleString(),
        debtInstallmentPerMonth:
          userData.bankInformation?.debtInstallmentPerMonth?.toLocaleString(),
        monthlyIncome:
          userData.bankInformation?.monthlyIncome?.toLocaleString(),
      },

      documents: {
        salarySlip: userData.JobDetail?.salarySlip || [],
        statement: userData.bankInformation?.bankStatementFiles || [],
      },
    };

  const salaryDocs =
    pdfData?.documents?.salarySlip?.map((img: string, i: number) => ({
      title: `Slip เดือนที่ ${i + 1}`,
      image: img,
    })) || [];
  const salaryPages: any[] = [];
  for (let i = 0; i < salaryDocs.length; i += ITEMS_PER_PAGE) {
    salaryPages.push(salaryDocs.slice(i, i + ITEMS_PER_PAGE));
  }

  const statementDocs =
    pdfData?.documents.statement?.map((img: string, i: number) => ({
      title: `Statemant เดือนที่ ${i + 1}`,
      image: img,
    })) || [];
  const statemantPage: any[] = [];
  for (let i = 0; i < statementDocs.length; i += ITEMS_PER_PAGE) {
    statemantPage.push(statementDocs.slice(i, i + ITEMS_PER_PAGE));
  }

  return (
    <ThemeProvider theme={professionalTheme}>
      <Box
        sx={{
          display: "flex",
          minHeight: "200vh",
          // bgcolor: "background.default",
          gap: 3,
          p: 3,
        }}
      >
        <Box
          ref={pdfRef}
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            overflow: "visible",
            maxHeight: "none",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              width: "210mm",
              minHeight: "274mm",
              boxSizing: "border-box",
              overflow: "hidden",
              p: "12mm",
              bgcolor: "white",
              position: "relative",
              mt: "20",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "6px",
                bgcolor: "primary.main",
              }}
            />

            <Grid container spacing={2} sx={{ mb: 4, mt: 2 }}>
              <Grid size={10}>
                <Typography variant="h5" color="primary" sx={{ mb: 1 }}>
                  {loanData.company.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ maxWidth: "400px" }}
                >
                  {loanData.company.address}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  <strong>Tax ID:</strong> {loanData.company.taxId} |{" "}
                  <strong>Tel:</strong> {loanData.company.phone}
                </Typography>
                <Typography
                  variant="body2"
                  color="primary.main"
                  sx={{ fontWeight: 500 }}
                >
                  {loanData.company.website}
                </Typography>
              </Grid>
              <Grid size={2} sx={{ textAlign: "right" }}>
                <Image
                  src="/logoEF-v2.png"
                  alt="EF logo"
                  width={90}
                  height={90}
                  className="object-contain"
                />
              </Grid>
            </Grid>

            <Typography
              variant="h6"
              align="center"
              sx={{
                mb: 3,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "text.primary",
                fontWeight: 600,
              }}
            >
              รายละเอียดข้อมูลส่วนบุคคล
            </Typography>

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid size={6}>
                <Box
                  sx={{
                    p: 2,
                    border: "1px solid #e0e0e0",
                    borderRadius: 2,
                    height: "100%",
                    bgcolor: "#fafafa",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    sx={{ mb: 1.5, fontWeight: 600 }}
                  >
                    ข้อมูลผู้กู้ (Borrower Details)
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid size={5}>
                      <Typography variant="body2" color="text.secondary">
                        ชื่อ-นามสกุล:
                      </Typography>
                    </Grid>
                    <Grid size={7}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {pdfData?.borrower.name}
                      </Typography>
                    </Grid>

                    <Grid size={5}>
                      <Typography variant="body2" color="text.secondary">
                        เลขบัตรประชาชน:
                      </Typography>
                    </Grid>
                    <Grid size={7}>
                      <Typography variant="body2">
                        {pdfData?.borrower.idCard}
                      </Typography>
                    </Grid>

                    <Grid size={5}>
                      <Typography variant="body2" color="text.secondary">
                        ที่อยู่:
                      </Typography>
                    </Grid>
                    <Grid size={7}>
                      <Typography variant="body2">
                        {pdfData?.borrower.address}
                      </Typography>
                    </Grid>

                    <Grid size={5}>
                      <Typography variant="body2" color="text.secondary">
                        วันที่สร้าง:
                      </Typography>
                    </Grid>
                    {/* <Grid size={7}>
                      <Typography variant="body2">
                        {pdfData?.borrower.contractDate}
                      </Typography>
                    </Grid> */}
                  </Grid>
                </Box>
              </Grid>
              <Grid size={6}>
                <Box
                  sx={{
                    p: 1,
                    border: "1px solid #e0e0e0",
                    borderRadius: 2,
                    height: "100%",
                    bgcolor: "#fafafa",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {pdfData?.borrower?.image && (
                    <Image
                      src={pdfData.borrower.image}
                      alt="Borrower Photo"
                      width={300}
                      height={200}
                      style={{ objectFit: "cover", borderRadius: "8px" }}
                    />
                  )}
                </Box>
              </Grid>
            </Grid>

            <Box
              sx={{
                p: 2,
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                mb: 2,
                bgcolor: "#fafafa",
              }}
            >
              <Typography
                variant="subtitle1"
                color="primary"
                sx={{ mb: 1.5, fontWeight: 600 }}
              >
                สถานที่ทำงาน
              </Typography>
              <Grid container spacing={1.5}>
                <Grid size={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>บริษัท:</strong> {pdfData?.workDetail?.companyName}
                  </Typography>
                </Grid>
                <Grid size={12}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>ตำแหน่งงาน:</strong> {pdfData?.workDetail?.position}
                  </Typography>
                </Grid>
                <Grid size={12}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>ที่อยู่:</strong>{" "}
                    {pdfData?.workDetail?.addressCompany}
                  </Typography>
                </Grid>
                <Grid size={4}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>เงินเดือน:</strong> {pdfData?.workDetail?.salary}
                  </Typography>
                </Grid>
                <Grid size={4}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>ระยะเวลาทำงาน:</strong>{" "}
                    {pdfData?.workDetail?.totalWork}
                  </Typography>
                </Grid>
                <Grid size={4}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>ประเภทการจ้างงาน:</strong>{" "}
                    {pdfData?.workDetail?.employment}
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <Box
              sx={{
                p: 2,
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                bgcolor: "#fafafa",
              }}
            >
              <Typography
                variant="subtitle1"
                color="primary"
                sx={{ mb: 1.5, fontWeight: 600 }}
              >
                รายละเอียดธนาคาร
              </Typography>
              <Grid container spacing={1.5}>
                <Grid size={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>ชื่อธนาคาร:</strong> {pdfData?.myBank?.bankName}
                  </Typography>
                </Grid>
                <Grid size={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>ชื่อบุคคล:</strong>{" "}
                    {pdfData?.myBank?.bankAccountName}
                  </Typography>
                </Grid>
                <Grid size={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>หมายเลขบัญชี:</strong>{" "}
                    {pdfData?.myBank?.bankAccountNumber}
                  </Typography>
                </Grid>
                <Grid size={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>สาขา:</strong> {pdfData?.myBank?.bankBranch ?? "-"}
                  </Typography>
                </Grid>
                <Grid size={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>ประเภทบัญชี:</strong> {pdfData?.myBank?.accountType}
                  </Typography>
                </Grid>
                <Grid size={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>ค่าใช้จ่ายต่อเดือน:</strong>{" "}
                    {pdfData?.myBank?.monthlyExpense}
                  </Typography>
                </Grid>
                <Grid size={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>หนี้สินต่อเดือน:</strong>{" "}
                    {pdfData?.myBank?.debtInstallmentPerMonth}
                  </Typography>
                </Grid>
                <Grid size={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>รายได้อื่นๆ:</strong>{" "}
                    {pdfData?.myBank?.monthlyIncome}
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <Box
              sx={{
                position: "absolute",
                bottom: "2mm",
                right: "12mm",
                color: "text.secondary",
                fontSize: "0.875rem",
              }}
            >
              หน้า 1/3
            </Box>
          </Paper>

          {salaryPages.map((pageDocs, pageIndex) => (
            <Paper
              key={pageIndex}
              elevation={3}
              sx={{
                width: "210mm",
                minHeight: "248mm",
                boxSizing: "border-box",
                overflow: "hidden",
                p: "12mm",
                bgcolor: "white",
                position: "relative",
                mt: "20",
              }}
            >
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid size={10}>
                  <Typography variant="h6" color="primary">
                    {loanData.company.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    เอกสารสำคัญในการยื่นขอสินเชื่อ
                  </Typography>
                </Grid>
                <Grid size={2} sx={{ textAlign: "right" }}>
                  <Image
                    src="/logoEF-v2.png"
                    alt="EF logo"
                    width={70}
                    height={70}
                  />
                </Grid>
              </Grid>

              <Typography
                variant="h6"
                align="center"
                sx={{
                  mb: 2,
                  letterSpacing: "0.1em",
                  fontWeight: 600,
                }}
              >
                เงินเดือนย้อนหลัก (6 เดือน)
              </Typography>

              <Grid container spacing={3}>
                {salaryDocs.map((doc, i) => (
                  <Grid key={i} size={6}>
                    <Paper
                      elevation={0}
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 2,
                        overflow: "hidden",
                        bgcolor: "#fafafa",
                      }}
                    >
                      <Box
                        sx={{
                          p: 1.5,
                          bgcolor: "primary.main",
                          color: "white",
                        }}
                      >
                        <Typography variant="subtitle2" fontWeight={600}>
                          {pageIndex * ITEMS_PER_PAGE + i + 1}. {doc.title}
                        </Typography>
                      </Box>

                      <Box sx={{ p: 1 }}>
                        <Image
                          src={doc.image}
                          alt={doc.title}
                          width={350}
                          height={220}
                          style={{
                            objectFit: "cover",
                            borderRadius: "4px",
                            width: "100%",
                          }}
                        />
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              <Box
                sx={{
                  position: "absolute",
                  bottom: "2mm",
                  right: "12mm",
                  color: "text.secondary",
                  fontSize: "0.875rem",
                }}
              >
                หน้า {pageIndex + 2}/{documentPages.length + 2}
              </Box>
            </Paper>
          ))}

          {statemantPage.map((pageDocs, pageIndex) => (
            <Paper
              key={pageIndex}
              elevation={3}
              sx={{
                width: "210mm",
                minHeight: "280mm",
                boxSizing: "border-box",
                overflow: "hidden",
                p: "12mm",
                bgcolor: "white",
                position: "relative",
                mb: "20",
              }}
            >
              {/* <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "6px",
                  bgcolor: "primary.main",
                }}
              /> */}

              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid size={10}>
                  <Typography variant="h6" color="primary">
                    {loanData.company.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    เอกสารสำคัญในการยื่นขอสินเชื่อ
                  </Typography>
                </Grid>
                <Grid size={2} sx={{ textAlign: "right" }}>
                  <Image
                    src="/logoEF-v2.png"
                    alt="EF logo"
                    width={70}
                    height={70}
                  />
                </Grid>
              </Grid>

              <Typography
                variant="h6"
                align="center"
                sx={{
                  mb: 2,
                  letterSpacing: "0.1em",
                  fontWeight: 600,
                }}
              >
                Statement (ย้อนหลัง 6 เดือน)
              </Typography>

              <Grid container spacing={3}>
                {statementDocs.map((doc, i) => (
                  <Grid key={i} size={6}>
                    <Paper
                      elevation={0}
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 2,
                        overflow: "hidden",
                        bgcolor: "#fafafa",
                      }}
                    >
                      <Box
                        sx={{
                          p: 1.5,
                          bgcolor: "primary.main",
                          color: "white",
                        }}
                      >
                        <Typography variant="subtitle2" fontWeight={600}>
                          {pageIndex * ITEMS_PER_PAGE + i + 1}. {doc.title}
                        </Typography>
                      </Box>

                      <Box sx={{ p: 1 }}>
                        <Image
                          src={doc.image}
                          alt={doc.title}
                          width={350}
                          height={220}
                          style={{
                            objectFit: "cover",
                            borderRadius: "4px",
                            width: "100%",
                          }}
                        />
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              <Box
                sx={{
                  position: "absolute",
                  bottom: "6mm",
                  right: "12mm",
                  color: "text.secondary",
                  fontSize: "0.875rem",
                }}
              >
                หน้า {pageIndex + 3}/{documentPages.length + 2}
              </Box>
            </Paper>
          ))}
        </Box>

        <Box
          sx={{
            width: "280px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Paper
            elevation={2}
            sx={{
              p: 2.5,
              borderRadius: 3,
              bgcolor: "white",
            }}
          >
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={downloadPDF}
              sx={{
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(26, 35, 126, 0.2)",
                textTransform: "none",
                fontSize: "1rem",
                py: 1.5,
                fontWeight: 600,
              }}
            >
              📥 Export to PDF
            </Button>
          </Paper>

          <Paper
            elevation={2}
            sx={{
              p: 2.5,
              borderRadius: 3,
              bgcolor: "white",
            }}
          >
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              📄 สรุปเอกสาร
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                • หน้าทั้งหมด: <strong>3 หน้า</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • เอกสารแนบ: <strong>6 ไฟล์</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • รูปแบบ: <strong>A4</strong>
              </Typography>
            </Box>
          </Paper>

          <Paper
            elevation={2}
            sx={{
              p: 2.5,
              borderRadius: 3,
              bgcolor: "white",
            }}
          >
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              🧭 เนื้อหาในเอกสาร
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography
                variant="body2"
                color="primary"
                sx={{ cursor: "pointer" }}
              >
                หน้า 1: ข้อมูลส่วนบุคคล
              </Typography>
              <Typography
                variant="body2"
                color="primary"
                sx={{ cursor: "pointer" }}
              >
                หน้า 2: เงินเดือน (ย้อนหลัง 6 เดือน)
              </Typography>
              <Typography
                variant="body2"
                color="primary"
                sx={{ cursor: "pointer" }}
              >
                หน้า 3: Statemeant
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
