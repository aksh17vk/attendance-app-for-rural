/* Smart Curriculum Attendance – Frontend Only
   Data stored in localStorage. Offline via Service Worker.
*/

const SAMPLE_STUDENTS = [
  { id: "S001", roll: 1, name: "Anjali Verma", gender: "F", guardian: "Ramesh Verma", phone: "9XXXXXXXXX", address: "Village Nayagaon" },
  { id: "S002", roll: 2, name: "Rohit Singh", gender: "M", guardian: "Sita Singh", phone: "9XXXXXXXXX", address: "Village Tekanpur" },
  { id: "S003", roll: 3, name: "Priya Sharma", gender: "F", guardian: "Mukesh Sharma", phone: "9XXXXXXXXX", address: "Village Motijheel", needs: "Low vision" },
  { id: "S004", roll: 4, name: "Aman Patel", gender: "M", guardian: "Kavita Patel", phone: "9XXXXXXXXX", address: "Village Baraghat" },
  { id: "S005", roll: 5, name: "Neha Yadav", gender: "F", guardian: "Vijay Yadav", phone: "9XXXXXXXXX", address: "Village Sirol" },
  { id: "S006", roll: 6, name: "Arjun Gupta", gender: "M", guardian: "Pooja Gupta", phone: "9XXXXXXXXX", address: "Village Morar" },
  { id: "S007", roll: 7, name: "Sneha Jain", gender: "F", guardian: "Nitin Jain", phone: "9XXXXXXXXX", address: "Village Hazira" },
  { id: "S008", roll: 8, name: "Karan Tomar", gender: "M", guardian: "Sunita Tomar", phone: "9XXXXXXXXX", address: "Village Bhind Road" },
  { id: "S009", roll: 9, name: "Muskan Khan", gender: "F", guardian: "Imran Khan", phone: "9XXXXXXXXX", address: "Village Pinto Park" },
  { id: "S010", roll: 10, name: "Devansh Rathore", gender: "M", guardian: "Meena Rathore", phone: "9XXXXXXXXX", address: "Village Gohad" },
  { id: "S011", roll: 11, name: "Aditi Mishra", gender: "F", guardian: "Shailendra Mishra", phone: "9XXXXXXXXX", address: "Village Mahalgaon" },
  { id: "S012", roll: 12, name: "Lakshya Sikarwar", gender: "M", guardian: "Anita Sikarwar", phone: "9XXXXXXXXX", address: "Village Thatipur" },
  { id: "S013", roll: 13, name: "Vidhi Saxena", gender: "F", guardian: "Harish Saxena", phone: "9XXXXXXXXX", address: "Village Lashkar" },
  { id: "S014", roll: 14, name: "Vikas Ahirwar", gender: "M", guardian: "Rukmini Ahirwar", phone: "9XXXXXXXXX", address: "Village Vinay Nagar" },
  { id: "S015", roll: 15, name: "Kriti Kulkarni", gender: "F", guardian: "Mahesh Kulkarni", phone: "9XXXXXXXXX", address: "Village Kampoo" },
  { id: "S016", roll: 16, name: "Saurabh Chouhan", gender: "M", guardian: "Rita Chouhan", phone: "9XXXXXXXXX", address: "Village Birla Nagar" },
  { id: "S017", roll: 17, name: "Riya Goswami", gender: "F", guardian: "Ajay Goswami", phone: "9XXXXXXXXX", address: "Shinde Ki Chhawani" },
  { id: "S018", roll: 18, name: "Harshit Khandelwal", gender: "M", guardian: "Neelam Khandelwal", phone: "9XXXXXXXXX", address: "Purani Chhawani" },
  { id: "S019", roll: 19, name: "Megha Tiwari", gender: "F", guardian: "Pradeep Tiwari", phone: "9XXXXXXXXX", address: "Village Sirol" },
  { id: "S020", roll: 20, name: "Yuvraj Bansal", gender: "M", guardian: "Savita Bansal", phone: "9XXXXXXXXX", address: "Village Morar" },
  { id: "S021", roll: 21, name: "Ishika Gupta", gender: "F", guardian: "Sanjay Gupta", phone: "9XXXXXXXXX", address: "Village Tekanpur" },
  { id: "S022", roll: 22, name: "Naman Sharma", gender: "M", guardian: "Komal Sharma", phone: "9XXXXXXXXX", address: "Village Nayagaon" },
  { id: "S023", roll: 23, name: "Pallavi Dwivedi", gender: "F", guardian: "Vivek Dwivedi", phone: "9XXXXXXXXX", address: "Village Thatipur" },
  { id: "S024", roll: 24, name: "Zaid Khan", gender: "M", guardian: "Farha Khan", phone: "9XXXXXXXXX", address: "Village Gohad" },
  { id: "S025", roll: 25, name: "Tanya Rawat", gender: "F", guardian: "Narendra Rawat", phone: "9XXXXXXXXX", address: "Village Lashkar" },
  { id: "S026", roll: 26, name: "Ritik Raj", gender: "M", guardian: "Seema Raj", phone: "9XXXXXXXXX", address: "Village Vinay Nagar" },
  { id: "S027", roll: 27, name: "Aarohi Mehta", gender: "F", guardian: "Shiv Mehta", phone: "9XXXXXXXXX", address: "Village Kampoo" },
  { id: "S028", roll: 28, name: "Manish Kushwaha", gender: "M", guardian: "Preeti Kushwaha", phone: "9XXXXXXXXX", address: "Village Pinto Park" },
  { id: "S029", roll: 29, name: "Shreya Agrawal", gender: "F", guardian: "Anil Agrawal", phone: "9XXXXXXXXX", address: "Village Birla Nagar" },
  { id: "S030", roll: 30, name: "Veer Pratap", gender: "M", guardian: "Sarita Pratap", phone: "9XXXXXXXXX", address: "Purani Chhawani" },
];

const STORAGE = {
  students: "sc_students",
  att: "sc_att",           // { 'YYYY-MM-DD': { studentId: 'Present'|'Absent'|'Late'|'Leave' } }
  activities: "sc_activities", // [{ id, date, subject, type, comp, scores: { studentId: number } }]
  settings: "sc_settings",
  backupKey: "sc_backup"
};

const els = {
  navLinks: () => document.querySelectorAll(".nav-link"),
  views: () => document.querySelectorAll(".view"),
  datePicker: () => document.getElementById("datePicker"),
  attList: () => document.getElementById("attList"),
  markAllPresent: () => document.getElementById("markAllPresent"),
  markAllAbsent: () => document.getElementById("markAllAbsent"),
  exportAttendance: () => document.getElementById("exportAttendance"),
  printSheet: () => document.getElementById("printSheet"),
  searchAtt: () => document.getElementById("searchAtt"),
  qrMode: () => document.getElementById("qrMode"),
  studentsGrid: () => document.getElementById("studentsGrid"),
  searchStu: () => document.getElementById("searchStu"),
  printQR: () => document.getElementById("printQR"),
  qrDialog: () => document.getElementById("qrDialog"),
  qrCards: () => document.getElementById("qrCards"),
  closeQr: () => document.getElementById("closeQr"),
  printQrNow: () => document.getElementById("printQrNow"),
  subjectSelect: () => document.getElementById("subjectSelect"),
  activityType: () => document.getElementById("activityType"),
  competencyCode: () => document.getElementById("competencyCode"),
  actDate: () => document.getElementById("actDate"),
  saveActivity: () => document.getElementById("saveActivity"),
  exportActivities: () => document.getElementById("exportActivities"),
  activityGrid: () => document.getElementById("activityGrid"),
  reportStart: () => document.getElementById("reportStart"),
  reportEnd: () => document.getElementById("reportEnd"),
  runReport: () => document.getElementById("runReport"),
  exportReport: () => document.getElementById("exportReport"),
  reportCards: () => document.getElementById("reportCards"),
  trend: () => document.getElementById("trend"),
  compTable: () => document.getElementById("compTable"),
  netStatus: () => document.getElementById("netStatus"),
  syncStatus: () => document.getElementById("syncStatus"),
  toggleTheme: () => document.getElementById("toggleTheme"),
  resetDemo: () => document.getElementById("resetDemo"),
  downloadBackup: () => document.getElementById("downloadBackup"),
  uploadBackup: () => document.getElementById("uploadBackup"),
  backupFile: () => document.getElementById("backupFile"),
  installPWA: () => document.getElementById("installPWA"),
};

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function initData() {
  if (!load(STORAGE.students)) save(STORAGE.students, SAMPLE_STUDENTS);
  if (!load(STORAGE.att)) save(STORAGE.att, {});
  if (!load(STORAGE.activities)) save(STORAGE.activities, []);
  if (!load(STORAGE.settings)) save(STORAGE.settings, { lang: "en", theme: "light" });
}
initData();

/* Navigation */
els.navLinks().forEach(btn => {
  btn.addEventListener("click", () => {
    els.navLinks().forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const view = btn.getAttribute("data-view");
    els.views().forEach(v => v.classList.toggle("hidden", v.id !== view));
  });
});

/* Theme */
(function initTheme() {
  const settings = load(STORAGE.settings);
  document.documentElement.setAttribute("data-theme", settings.theme || "light");
  els.toggleTheme().addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme");
    const next = cur === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    settings.theme = next; save(STORAGE.settings, settings);
  });
})();

/* Network status */
function updateNetStatus() {
  const online = navigator.onLine;
  const n = els.netStatus();
  n.textContent = online ? "Online" : "Offline";
  n.className = `badge ${online ? "online" : "offline"}`;
}
window.addEventListener("online", updateNetStatus);
window.addEventListener("offline", updateNetStatus);
updateNetStatus();

/* Date defaults */
(function initDates() {
  const today = new Date();
  const iso = today.toISOString().slice(0,10);
  els.datePicker().value = iso;
  els.actDate().value = iso;
  els.reportStart().value = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().slice(0,10);
  els.reportEnd().value = iso;
})();

/* Attendance rendering */
function renderAttendance() {
  const date = els.datePicker().value;
  const students = load(STORAGE.students, []);
  const att = load(STORAGE.att, {});
  const filter = (els.searchAtt().value || "").toLowerCase();

  const list = els.attList();
  list.innerHTML = "";

  students
    .filter(s => {
      const t = `${s.name} ${s.roll} ${s.id}`.toLowerCase();
      return t.includes(filter);
    })
    .forEach(s => {
      const status = ((att[date] || {})[s.id]) || null;
      const card = document.createElement("div");
      card.className = "student-card";
      card.innerHTML = `
        <header>
          <strong>${s.roll}. ${s.name}</strong>
          <span class="student-meta">${s.gender === "F" ? "Girl" : "Boy"} • ${s.id}</span>
        </header>
        <div class="student-meta">Guardian: ${s.guardian} • ${s.phone}</div>
        <div class="toggle-group" role="group" aria-label="Attendance toggles for ${s.name}">
          <button class="toggle ${status==='Present'?'active':''}" data-val="Present">Present</button>
          <button class="toggle ${status==='Absent'?'active':''}" data-val="Absent">Absent</button>
          <button class="toggle late ${status==='Late'?'active':''}" data-val="Late">Late</button>
          <button class="toggle leave ${status==='Leave'?'active':''}" data-val="Leave">Leave</button>
        </div>
      `;
      const toggles = card.querySelectorAll(".toggle");
      toggles.forEach(t => t.addEventListener("click", () => setAttendance(s.id, date, t.getAttribute("data-val"))));
      list.appendChild(card);
    });
}
function setAttendance(studentId, date, val) {
  const att = load(STORAGE.att, {});
  att[date] = att[date] || {};
  att[date][studentId] = val;
  save(STORAGE.att, att);
  els.syncStatus().textContent = "Saved locally";
  els.syncStatus().className = "badge syncing";
  setTimeout(() => {
    els.syncStatus().textContent = "Synced";
    els.syncStatus().className = "badge idle";
  }, 600);
  renderAttendance();
}

/* Mark all present */
els.markAllPresent().addEventListener("click", () => {
  const date = els.datePicker().value;
  const students = load(STORAGE.students, []);
  const att = load(STORAGE.att, {});
  att[date] = att[date] || {};
  students.forEach(s => att[date][s.id] = "Present");
  save(STORAGE.att, att);
  renderAttendance();
});

/*mark all absent*/
els.markAllAbsent = document.getElementById("markAllAbsent");
els.markAllAbsent.addEventListener("click", () => {
  const date = els.datePicker().value;
  const students = load(STORAGE.students, []);
  const att = load(STORAGE.att, {});
  att[date] = att[date] || {};
  students.forEach(s => att[date][s.id] = "Absent");
  save(STORAGE.att, att);
  renderAttendance();
});

/* Search & date change */
els.searchAtt().addEventListener("input", renderAttendance);
els.datePicker().addEventListener("change", renderAttendance);

/* Export attendance CSV */
els.exportAttendance().addEventListener("click", () => {
  const date = els.datePicker().value;
  const att = load(STORAGE.att, {})[date] || {};
  const students = load(STORAGE.students, []);
  const rows = [["Date","Roll","ID","Name","Status"]];
  students.forEach(s => rows.push([date, s.roll, s.id, s.name, att[s.id] || "—"]));
  downloadCSV(rows, `attendance_${date}.csv`);
});

/* Print sheet */
els.printSheet().addEventListener("click", () => window.print());

/* QR mode (simple code capture in search to set present) */
els.qrMode().addEventListener("change", () => {
  const enabled = els.qrMode().checked;
  els.searchAtt().placeholder = enabled ? "Scan/paste code (ID) to mark Present…" : "Search by name or roll…";
});
els.searchAtt().addEventListener("keydown", (e) => {
  if (!els.qrMode().checked) return;
  if (e.key === "Enter") {
    const code = els.searchAtt().value.trim();
    const date = els.datePicker().value;
    const students = load(STORAGE.students, []);
    const match = students.find(s => s.id === code || String(s.roll) === code);
    if (match) {
      setAttendance(match.id, date, "Present");
      els.searchAtt().value = "";
    }
  }
});

/* Students rendering */
function renderStudents() {
  const grid = els.studentsGrid();
  const filter = (els.searchStu().value || "").toLowerCase();
  const students = load(STORAGE.students, []);
  grid.innerHTML = "";
  students
    .filter(s => `${s.name} ${s.roll} ${s.id}`.toLowerCase().includes(filter))
    .forEach(s => {
      const card = document.createElement("div");
      card.className = "student-card";
      card.innerHTML = `
        <header><strong>${s.roll}. ${s.name}</strong><span class="student-meta">${s.id}</span></header>
        <div class="student-meta">${s.gender === "F" ? "Girl" : "Boy"} • Guardian: ${s.guardian}</div>
        <div class="row">
          <span class="badge idle">QR: ${qrCodeFor(s)}</span>
          <button class="btn ghost" data-id="${s.id}">Copy ID</button>
        </div>
      `;
      card.querySelector("button").addEventListener("click", () => {
        navigator.clipboard.writeText(s.id).catch(()=>{});
      });
      grid.appendChild(card);
    });
}
els.searchStu().addEventListener("input", renderStudents);

/* QR cards dialog */
els.printQR().addEventListener("click", () => {
  const cards = els.qrCards();
  const students = load(STORAGE.students, []);
  cards.innerHTML = "";
  students.forEach(s => {
    const div = document.createElement("div");
    div.className = "qr-card";
    div.innerHTML = `
      <h3>${s.roll}. ${s.name}</h3>
      <p>ID: <strong>${s.id}</strong></p>
      <p>Class: 5-A</p>
      <div class="qr">${qrCodeFor(s)}</div>
      <small>Scan or type ID to mark Present</small>
    `;
    cards.appendChild(div);
  });
  els.qrDialog().showModal();
});
els.closeQr().addEventListener("click", () => els.qrDialog().close());
els.printQrNow().addEventListener("click", () => window.print());

/* Simple QR code surrogate (no external libs): encode ID into a block string */
function qrCodeFor(s) {
  // For demo: create a compact code pattern using roll + id hash.
  const seed = `${s.id}-${s.roll}`;
  let sum = 0; for (let i = 0; i < seed.length; i++) sum += seed.charCodeAt(i);
  const rows = 9, cols = 18; // small block
  let out = "";
  for (let r=0;r<rows;r++){
    for (let c=0;c<cols;c++){
      const bit = ((sum + r*7 + c*13) % 5) < 2;
      out += bit ? "█" : " ";
    }
    out += "\n";
  }
  return out;
}

/* Activities */
els.saveActivity().addEventListener("click", () => {
  const subject = els.subjectSelect().value;
  const type = els.activityType().value;
  const date = els.actDate().value;
  if (!date) return alert("Select activity date.");

  const students = load(STORAGE.students, []);
  // Default: score whole class as 3 (neutral). You can edit later per student.
  const scores = {}; students.forEach(s => scores[s.id] = 3);

  const act = { id: `A_${Date.now()}`, date, subject, type, scores };
  const list = load(STORAGE.activities, []);
  list.push(act); save(STORAGE.activities, list);
  renderActivities();
});

function renderActivities() {
  const grid = els.activityGrid();
  grid.innerHTML = "";
  const activities = load(STORAGE.activities, []);
  const students = load(STORAGE.students, []);
  if (!activities.length) {
    grid.innerHTML = `<div class="card">No activities yet. Create one above.</div>`;
    return;
  }
  activities.slice().reverse().forEach(a => {
    const avg = average(Object.values(a.scores));
    const card = document.createElement("div");
    card.className = "card";
    const title = `${a.subject} • ${a.type} • ${a.date}`;
    card.innerHTML = `
      <h3>${title}</h3>
      <p class="student-meta">Avg score: ${avg.toFixed(1)} / 5</p>
      <div class="table"><table>
        <thead><tr><th>Roll</th><th>Name</th><th>Score</th></tr></thead>
        <tbody>
          ${students.map(s => `
            <tr>
              <td>${s.roll}</td>
              <td>${s.name}</td>
              <td>
                <input type="number" min="0" max="5" step="1" value="${a.scores[s.id] ?? 0}"
                  data-act="${a.id}" data-stu="${s.id}" class="input" style="min-width:80px" aria-label="Score for ${s.name}">
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table></div>
    `;
    grid.appendChild(card);
  });
  grid.querySelectorAll("input[type=number]").forEach(inp => {
    inp.addEventListener("change", () => {
      const actId = inp.getAttribute("data-act");
      const stuId = inp.getAttribute("data-stu");
      const val = Math.max(0, Math.min(5, Number(inp.value)));
      const acts = load(STORAGE.activities, []);
      const idx = acts.findIndex(x => x.id === actId);
      if (idx >= 0) {
        acts[idx].scores[stuId] = val;
        save(STORAGE.activities, acts);
      }
    });
  });
}

function average(arr) { return arr.length ? arr.reduce((a,b)=>a+b,0)/arr.length : 0; }

/* Export activities CSV */
els.exportActivities().addEventListener("click", () => {
  const acts = load(STORAGE.activities, []);
  const students = load(STORAGE.students, []);
  const rows = [["ActivityID","Date","Subject","Type","StudentID","Roll","Name","Score"]];
  acts.forEach(a => {
    students.forEach(s => {
      rows.push([a.id, a.date, a.subject, a.type, a.comp || "", s.id, s.roll, s.name, a.scores[s.id] ?? ""]);
    });
  });
  downloadCSV(rows, `activities_${new Date().toISOString().slice(0,10)}.csv`);
});

/* Reports */
els.runReport().addEventListener("click", renderReport);
els.exportReport().addEventListener("click", exportReportCSV);

function renderReport() {
  const start = new Date(els.reportStart().value);
  const end = new Date(els.reportEnd().value);
  const att = load(STORAGE.att, {});
  const students = load(STORAGE.students, []);
  const activities = load(STORAGE.activities, []);
  const dates = enumerateDates(start, end);

  const totals = { present:0, absent:0, late:0, leave:0 };
  dates.forEach(d => {
    const row = att[d] || {};
    Object.values(row).forEach(v => {
      if (v === "Present") totals.present++;
      else if (v === "Absent") totals.absent++;
      else if (v === "Late") totals.late++;
      else if (v === "Leave") totals.leave++;
    });
  });

  // Summary cards
  els.reportCards().innerHTML = `
    <div class="card"><h3>Present</h3><p>${totals.present}</p></div>
    <div class="card"><h3>Absent</h3><p>${totals.absent}</p></div>
    <div class="card"><h3>Late</h3><p>${totals.late}</p></div>
    <div class="card"><h3>Leave</h3><p>${totals.leave}</p></div>
  `;

  // Trend bars (present count per day)
  const trend = els.trend();
  trend.innerHTML = "";
  dates.slice(-14).forEach(d => {
    const row = att[d] || {};
    const count = Object.values(row).filter(v => v === "Present").length;
    const div = document.createElement("div");
    div.className = "bar";
    const inner = document.createElement("div");
    inner.style.height = `${(count/30)*100}%`;
    inner.title = `${d}: ${count} present`;
    div.appendChild(inner);
    trend.appendChild(div);
  });

  // Competency table from activities
  const compMap = {};
  activities.forEach(a => {
    const k = `${a.subject}|${a.comp||"—"}`;
    const avg = average(Object.values(a.scores));
    if (!compMap[k]) compMap[k] = { count: 0, avg: 0 };
    compMap[k].count++;
    compMap[k].avg += avg;
  });
  Object.keys(compMap).forEach(k => compMap[k].avg = compMap[k].avg / compMap[k].count);

  const tableDiv = els.compTable();
  const entries = Object.entries(compMap).sort((a,b)=>b[1].avg - a[1].avg).slice(0,10);
  tableDiv.innerHTML = `
    <table>
      <thead><tr><th>Subject</th><th>Competency</th><th>Sessions</th><th>Avg score</th></tr></thead>
      <tbody>
        ${entries.map(([k,v]) => {
          const [subject, comp] = k.split("|");
          return `<tr><td>${subject}</td><td>${comp}</td><td>${v.count}</td><td>${v.avg.toFixed(1)}</td></tr>`;
        }).join("")}
      </tbody>
    </table>
  `;
}
function exportReportCSV() {
  const start = els.reportStart().value;
  const end = els.reportEnd().value;
  const att = load(STORAGE.att, {});
  const rows = [["Date","StudentID","Status"]];
  enumerateDates(new Date(start), new Date(end)).forEach(d => {
    const row = att[d] || {};
    Object.entries(row).forEach(([sid, status]) => rows.push([d, sid, status]));
  });
  downloadCSV(rows, `report_${start}_to_${end}.csv`);
}

/* Utilities */
function enumerateDates(start, end) {
  const dates = [];
  const d = new Date(start);
  while (d <= end) {
    dates.push(d.toISOString().slice(0,10));
    d.setDate(d.getDate() + 1);
  }
  return dates;
}
function downloadCSV(rows, filename) {
  const content = rows.map(r => r.map(cell => `"${String(cell).replace(/"/g,'""')}"`).join(",")).join("\n");
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

/* Backup & restore */
els.downloadBackup().addEventListener("click", () => {
  const dump = {
    students: load(STORAGE.students, []),
    att: load(STORAGE.att, {}),
    activities: load(STORAGE.activities, []),
    settings: load(STORAGE.settings, {}),
    exportedAt: new Date().toISOString()
  };
  const blob = new Blob([JSON.stringify(dump, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `backup_${new Date().toISOString().slice(0,10)}.json`; a.click();
  URL.revokeObjectURL(url);
});
els.uploadBackup().addEventListener("click", () => els.backupFile().click());
els.backupFile().addEventListener("change", async () => {
  const file = els.backupFile().files[0];
  if (!file) return;
  const text = await file.text();
  const data = JSON.parse(text);
  if (data.students) save(STORAGE.students, data.students);
  if (data.att) save(STORAGE.att, data.att);
  if (data.activities) save(STORAGE.activities, data.activities);
  if (data.settings) save(STORAGE.settings, data.settings);
  renderAll();
});

/* Reset demo data */
els.resetDemo().addEventListener("click", () => {
  if (!confirm("Clear all local data and reload?")) return;
  localStorage.removeItem(STORAGE.students);
  localStorage.removeItem(STORAGE.att);
  localStorage.removeItem(STORAGE.activities);
  localStorage.removeItem(STORAGE.settings);
  initData();
  renderAll();
});

/* Language (placeholders for extension) */
document.querySelectorAll("[data-lang]").forEach(btn => {
  btn.addEventListener("click", () => {
    const lang = btn.getAttribute("data-lang");
    const settings = load(STORAGE.settings, {});
    settings.lang = lang; save(STORAGE.settings, settings);
    alert(lang === "hi" ? "भाषा सेट: हिंदी (डेमो)" : "Language set: English (demo)");
  });
});

/* PWA Install prompt */
let deferredPrompt = null;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
});
els.installPWA().addEventListener("click", async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt = null;
  } else {
    alert("Install is available from browser menu (Add to Home Screen).");
  }
});

/* Service Worker register */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(()=>{});
  });
}

/* Initial renders */
function renderAll() {
  renderAttendance();
  renderStudents();
  renderActivities();
  renderReport();
}
renderAll();

/* Predictive analytics (simple example) */
  function predictAbsences(attendanceData, studentId) {
    const dates = Object.keys(attendanceData).sort();
    const absences = dates.map(d => (attendanceData[d][studentId] === 'Absent' ? 1 : 0));
    // Simple trend: average absences over last 7 days
    const recent = absences.slice(-7);
    return recent.reduce((a, b) => a + b, 0) / recent.length * 30;  // Predict monthly absences
  }