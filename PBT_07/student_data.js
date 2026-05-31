// B2: Student Data Processing

const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

// 1. Tính điểm TB và xếp loại
const results = [];
for (let i = 0; i < students.length; i++) {
    const s = students[i];
    const avg = s.math * 0.4 + s.physics * 0.3 + s.cs * 0.3;
    let rank;
    if (avg >= 8.0) rank = "Giỏi";
    else if (avg >= 6.5) rank = "Khá";
    else if (avg >= 5.0) rank = "Trung bình";
    else rank = "Yếu";
    
    results.push({ ...s, avg: avg.toFixed(1), rank });
}

// 3. In bảng
console.log("| STT | Tên    | TB   | Xếp loại    |");
console.log("|-----|--------|------|-------------|");
for (let i = 0; i < results.length; i++) {
    const r = results[i];
    console.log(`| ${i+1}   | ${r.name.padEnd(6)} | ${r.avg}  | ${r.rank.padEnd(11)} |`);
}

// 4. Đếm số SV mỗi loại
const count = { "Giỏi": 0, "Khá": 0, "Trung bình": 0, "Yếu": 0 };
for (let r of results) count[r.rank]++;
console.log("\n=== Thống kê xếp loại ===");
for (let rank in count) {
    console.log(`${rank}: ${count[rank]} sinh viên`);
}

// 5. Tìm max/min
let maxStudent = results[0], minStudent = results[0];
for (let r of results) {
    if (parseFloat(r.avg) > parseFloat(maxStudent.avg)) maxStudent = r;
    if (parseFloat(r.avg) < parseFloat(minStudent.avg)) minStudent = r;
}
console.log(`\nĐiểm cao nhất: ${maxStudent.name} (${maxStudent.avg})`);
console.log(`Điểm thấp nhất: ${minStudent.name} (${minStudent.avg})`);

// 6. TB toàn lớp từng môn
let sumMath = 0, sumPhysics = 0, sumCS = 0;
for (let s of students) {
    sumMath += s.math;
    sumPhysics += s.physics;
    sumCS += s.cs;
}
const n = students.length;
console.log(`\n=== Điểm TB toàn lớp ===`);
console.log(`Toán: ${(sumMath/n).toFixed(2)}`);
console.log(`Lý: ${(sumPhysics/n).toFixed(2)}`);
console.log(`Tin: ${(sumCS/n).toFixed(2)}`);

// 7. Bonus: TB theo giới tính
const male = results.filter(r => r.gender === "M");
const female = results.filter(r => r.gender === "F");
const avgMale = male.reduce((sum, r) => sum + parseFloat(r.avg), 0) / male.length;
const avgFemale = female.reduce((sum, r) => sum + parseFloat(r.avg), 0) / female.length;
console.log(`\n=== Điểm TB theo giới tính ===`);
console.log(`Nam: ${avgMale.toFixed(2)}`);
console.log(`Nữ: ${avgFemale.toFixed(2)}`);
