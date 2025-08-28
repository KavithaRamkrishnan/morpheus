"use client"; // because it uses useMemo and interactive charts

import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { TrendingUp, Users, ClipboardList, AlertTriangle, Star } from "lucide-react";

// Morpheus palette (teal/green-forward)
const MORPHEUS = {
  teal: "#14b8a6",       // primary
  tealDark: "#0f766e",   // accents
  mint: "#2dd4bf",       // charts
  lime: "#84cc16",       // success
  amber: "#f59e0b",      // warning
  rose: "#f43f5e",       // blocked
  slate: "#64748b"
};

// --- Mock data (replace with live Wix CMS queries) --- //
const studentsByGrade = [
  { grade: "8", students: 120, assessments: 72 },
  { grade: "9", students: 115, assessments: 86 },
  { grade: "10", students: 130, assessments: 104 },
  { grade: "11", students: 118, assessments: 96 },
  { grade: "12", students: 110, assessments: 92 },
];

const rolesDistribution = [
  { name: "STEM", value: 42 },
  { name: "Business/Finance", value: 23 },
  { name: "Arts/Design/Media", value: 18 },
  { name: "Social Sciences", value: 11 },
  { name: "Health", value: 6 },
];

// Parent sentiment (derived from feedback NPS/CSAT)
const parentSentiment = [
  { name: "Positive", value: 68 },
  { name: "Neutral", value: 22 },
  { name: "Negative", value: 10 }
];

const sentimentColors = [MORPHEUS.teal, MORPHEUS.mint, MORPHEUS.rose];
const roleColors = [MORPHEUS.mint, MORPHEUS.amber, "#34d399", "#a78bfa", MORPHEUS.rose];

// Assessments assignment & completion per grade
const assessmentLoads = [
  { grade: 8, assigned: 5, completed: 3 },
  { grade: 9, assigned: 5, completed: 4 },
  { grade: 10, assigned: 6, completed: 5 },
  { grade: 11, assigned: 7, completed: 6 },
  { grade: 12, assigned: 7, completed: 6 },
];

// Sample student readiness rows (with assessment progress)
const readinessRows = [
  { name: "Aarav K.", grade: 10, target: "Engineering", required: ["Mathematics","Physics","Chemistry"], chosen:["Mathematics","Physics","Computer Science"], status: "OK", assigned: 6, completed: 5 },
  { name: "Sara M.", grade: 11, target: "Medicine", required: ["Biology","Chemistry","Physics"], chosen:["Biology","Mathematics","Physics"], status: "WARNING", note: "Missing Chemistry", assigned: 7, completed: 4 },
  { name: "Dev P.", grade: 12, target: "Law", required: ["Literature in English","Economics","Business"], chosen:["Literature in English","Economics","Business"], status: "OK", assigned: 5, completed: 5 },
  { name: "Ishita R.", grade: 9, target: "Commerce", required: ["Mathematics","Economics","Accounting"], chosen:["Mathematics","Economics","Business"], status: "WARNING", note: "Replace Business ⇒ Accounting", assigned: 5, completed: 3 },
  { name: "Noah D.", grade: 11, target: "Medicine", required: ["Biology","Chemistry","Physics"], chosen:["Mathematics","Physics","Computer Science"], status: "BLOCKED", note: "Switch to PCB", assigned: 7, completed: 2 },
];

// Top role flavours (school-wide highlights)
const roleFlavours = [
  { label: "Software Engineer", cluster: "STEM-Engineering" },
  { label: "Data Scientist", cluster: "STEM-Science" },
  { label: "Architect", cluster: "Arts/Design/Media" },
  { label: "Financial Analyst", cluster: "Business/Finance" },
  { label: "Doctor (MBBS)", cluster: "STEM-Health" },
];

export default function Dashboard() {
  const totals = useMemo(() => {
    const totalStudents = studentsByGrade.reduce((s,x)=>s+x.students,0);
    const totalAssess = studentsByGrade.reduce((s,x)=>s+x.assessments,0);
    const completedPct = Math.round((totalAssess/Math.max(1,totalStudents))*100);
    const risk = readinessRows.filter(r=>r.status!=="OK").length;
    const topCluster = rolesDistribution.slice().sort((a,b)=>b.value-a.value)[0]?.name || "-";
    return { totalStudents, completedPct, risk, topCluster };
  }, []);

  // Derived tables in-component (replace with CMS data in Wix)
  const assessmentTrackerRows = readinessRows.map(r => ({
    name: r.name, grade: r.grade, assigned: r.assigned, completed: r.completed,
  }));

  return (
    <div className="min-h-screen w-full bg-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight" style={{color:MORPHEUS.tealDark}}>Morpheus — Institution Admin Dashboard</h1>
          <p className="text-slate-600">Grades 8–12 • Assessments • Top Roles • Curriculum Readiness • Parent Sentiment</p>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-sm rounded-2xl border-teal-100 border">
            <CardContent className="p-5 flex items-center gap-4">
              <Users className="h-8 w-8" color={MORPHEUS.tealDark} />
              <div>
                <div className="text-sm text-gray-500">Total Students</div>
                <div className="text-2xl font-semibold" style={{color:MORPHEUS.tealDark}}>{totals.totalStudents}</div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm rounded-2xl border-teal-100 border">
            <CardContent className="p-5 flex items-center gap-4">
              <ClipboardList className="h-8 w-8" color={MORPHEUS.tealDark} />
              <div>
                <div className="text-sm text-gray-500">Assessments Completed</div>
                <div className="text-2xl font-semibold" style={{color:MORPHEUS.tealDark}}>{totals.completedPct}%</div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm rounded-2xl border-teal-100 border">
            <CardContent className="p-5 flex items-center gap-4">
              <AlertTriangle className="h-8 w-8" color={MORPHEUS.amber} />
              <div>
                <div className="text-sm text-gray-500">Students at Risk</div>
                <div className="text-2xl font-semibold text-amber-600">{totals.risk}</div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm rounded-2xl border-teal-100 border">
            <CardContent className="p-5 flex items-center gap-4">
              <TrendingUp className="h-8 w-8" color={MORPHEUS.tealDark} />
              <div>
                <div className="text-sm text-gray-500">Top Cluster (School)</div>
                <div className="text-2xl font-semibold" style={{color:MORPHEUS.tealDark}}>{totals.topCluster}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assessments by Grade — Bar chart */}
        <Card className="shadow-sm rounded-2xl border border-teal-50">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold" style={{color:MORPHEUS.tealDark}}>Assessments by Grade</h2>
              <Button variant="outline" size="sm" style={{borderColor:MORPHEUS.teal, color:MORPHEUS.teal}}>Export CSV</Button>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={studentsByGrade}>
                  <XAxis dataKey="grade" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="students" name="Students" fill="#d1fae5" radius={[6,6,0,0]} />
                  <Bar dataKey="assessments" name="Assessments" fill={MORPHEUS.teal} radius={[6,6,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Role & Parent Sentiment in-line (two doughnuts) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-sm rounded-2xl border border-teal-50">
            <CardContent className="p-5">
              <h2 className="text-lg font-semibold mb-3" style={{color:MORPHEUS.tealDark}}>Role Distribution (School)</h2>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={rolesDistribution} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} stroke="none">
                      {rolesDistribution.map((entry, index) => (
                        <Cell key={`cell-role-${index}`} fill={roleColors[index % roleColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm rounded-2xl border border-teal-50">
            <CardContent className="p-5">
              <h2 className="text-lg font-semibold mb-3" style={{color:MORPHEUS.tealDark}}>Parent Sentiment</h2>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={parentSentiment} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} stroke="none">
                      {parentSentiment.map((entry, index) => (
                        <Cell key={`cell-sent-${index}`} fill={sentimentColors[index % sentimentColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Role Flavours */}
        <Card className="shadow-sm rounded-2xl border border-teal-50">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold" style={{color:MORPHEUS.tealDark}}>Top Role Flavours</h2>
              <Star size={18} color={MORPHEUS.tealDark} />
            </div>
            <div className="flex flex-wrap gap-2">
              {roleFlavours.map((r, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-xs" style={{backgroundColor:"#ecfeff", color:MORPHEUS.tealDark, border:`1px solid ${MORPHEUS.teal}`}}>
                  {r.label} • <span className="text-slate-500">{r.cluster}</span>
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Assessments (Grade table + Per Student) side-by-side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Assessment Loads per Grade */}
          <Card className="shadow-sm rounded-2xl border border-teal-50">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold" style={{color:MORPHEUS.tealDark}}>Assessments Assigned vs Completed (by Grade)</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" style={{borderColor:MORPHEUS.teal, color:MORPHEUS.teal}}>Export CSV</Button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 border-b">
                      <th className="py-2 pr-4">Grade</th>
                      <th className="py-2 pr-4">Assigned</th>
                      <th className="py-2 pr-4">Completed</th>
                      <th className="py-2 pr-4">Completion %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assessmentLoads.map((r, idx) => {
                      const pct = Math.round((r.completed / Math.max(1,r.assigned)) * 100);
                      return (
                        <tr key={idx} className="border-b last:border-0">
                          <td className="py-2 pr-4">{r.grade}</td>
                          <td className="py-2 pr-4">{r.assigned}</td>
                          <td className="py-2 pr-4">{r.completed}</td>
                          <td className="py-2 pr-4 font-medium" style={{color: pct>=80? MORPHEUS.lime : pct>=50? MORPHEUS.amber : MORPHEUS.rose}}>{pct}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Assessment Tracker — Per Student */}
          <Card className="shadow-sm rounded-2xl border border-teal-50">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold" style={{color:MORPHEUS.tealDark}}>Assessment Tracker — Per Student</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" style={{borderColor:MORPHEUS.teal, color:MORPHEUS.teal}}>Export CSV</Button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 border-b">
                      <th className="py-2 pr-4">Student</th>
                      <th className="py-2 pr-4">Grade</th>
                      <th className="py-2 pr-4">Assigned</th>
                      <th className="py-2 pr-4">Completed</th>
                      <th className="py-2 pr-4">Completion %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assessmentTrackerRows.map((r, idx) => {
                      const pct = Math.round((r.completed / Math.max(1,r.assigned)) * 100);
                      return (
                        <tr key={idx} className="border-b last:border-0">
                          <td className="py-2 pr-4">{r.name}</td>
                          <td className="py-2 pr-4">{r.grade}</td>
                          <td className="py-2 pr-4">{r.assigned}</td>
                          <td className="py-2 pr-4">{r.completed}</td>
                          <td className="py-2 pr-4 font-medium" style={{color: pct>=80? MORPHEUS.lime : pct>=50? MORPHEUS.amber : MORPHEUS.rose}}>{pct}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Role→Subjects→University Alignment */}
        <Card className="shadow-sm rounded-2xl border border-teal-50">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold" style={{color:MORPHEUS.tealDark}}>Alignment — Suggested Role → Subjects → University</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" style={{borderColor:MORPHEUS.teal, color:MORPHEUS.teal}}>Export CSV</Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="py-2 pr-4">Student</th>
                    <th className="py-2 pr-4">Morpheus Suggested Role</th>
                    <th className="py-2 pr-4">Required A-Levels</th>
                    <th className="py-2 pr-4">Chosen A-Levels</th>
                    <th className="py-2 pr-4">University</th>
                    <th className="py-2 pr-4">Eligibility</th>
                    <th className="py-2 pr-4">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {[...readinessRows].slice(0,3).map((r, idx) => {
                    // derive a mock target university per role/target for demo
                    const uni = r.target === "Engineering" ? "BITS Pilani" : r.target === "Medicine" ? "CMC Vellore" : r.target === "Law" ? "NLU Delhi" : "—";
                    const eligible = r.status === "OK";
                    return (
                      <tr key={idx} className="border-b last:border-0">
                        <td className="py-2 pr-4">{r.name}</td>
                        <td className="py-2 pr-4">{r.target}</td>
                        <td className="py-2 pr-4">{r.required.join(", ")}</td>
                        <td className="py-2 pr-4">{r.chosen.join(", ")}</td>
                        <td className="py-2 pr-4">{uni}</td>
                        <td className="py-2 pr-4">
                          {eligible ? (
                            <Badge className="bg-emerald-500">Eligible</Badge>
                          ) : (
                            <Badge className="bg-rose-500">Gap</Badge>
                          )}
                        </td>
                        <td className="py-2 pr-4 text-gray-600">{r.note || (eligible ? "Aligned" : "—")}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Readiness table (with assigned vs completed per student) */}
        <Card className="shadow-sm rounded-2xl border border-teal-50">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold" style={{color:MORPHEUS.tealDark}}>Curriculum Readiness — Risks & Gaps</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" style={{borderColor:MORPHEUS.teal, color:MORPHEUS.teal}}>Export CSV</Button>
                <Button size="sm" style={{backgroundColor:MORPHEUS.teal, color:"white"}}>Download PDF</Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="py-2 pr-4">Student</th>
                    <th className="py-2 pr-4">Grade</th>
                    <th className="py-2 pr-4">Target</th>
                    <th className="py-2 pr-4">Required</th>
                    <th className="py-2 pr-4">Chosen</th>
                    <th className="py-2 pr-4">Assigned</th>
                    <th className="py-2 pr-4">Completed</th>
                    <th className="py-2 pr-4">Status</th>
                    <th className="py-2 pr-4">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {readinessRows.map((r, idx) => (
                    <tr key={idx} className="border-b last:border-0">
                      <td className="py-2 pr-4">{r.name}</td>
                      <td className="py-2 pr-4">{r.grade}</td>
                      <td className="py-2 pr-4">{r.target}</td>
                      <td className="py-2 pr-4 text-gray-700">{r.required.join(", ")}</td>
                      <td className="py-2 pr-4">{r.chosen.join(", ")}</td>
                      <td className="py-2 pr-4">{r.assigned}</td>
                      <td className="py-2 pr-4">{r.completed}</td>
                      <td className="py-2 pr-4">
                        {r.status === "OK" && <Badge className="bg-emerald-500">OK</Badge>}
                        {r.status === "WARNING" && <Badge className="bg-amber-500">Warning</Badge>}
                        {r.status === "BLOCKED" && <Badge className="bg-rose-500">Blocked</Badge>}
                      </td>
                      <td className="py-2 pr-4 text-gray-600">{r.note || ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-xs text-gray-500 text-center pb-6">Morpheus77 • Sample UI • Replace mock data with live Wix CMS queries. Colors aligned to Morpheus teal/green palette.</div>
      </div>
    </div>
  );
}
