import {useEffect,useMemo,useState} from 'react';

export default function TeacherSubmission({lesson,level,writing}:{lesson:number;level:string;writing:string[]}) {
 const [endpoint,setEndpoint]=useState('');const [classCode,setClassCode]=useState('');const [classroom,setClassroom]=useState('');const [studentNumber,setStudentNumber]=useState('');const [sent,setSent]=useState(false);
 useEffect(()=>{fetch(import.meta.env.BASE_URL+'teacher-submission.json').then(r=>{if(!r.ok)throw Error();return r.json();}).then(c=>{if(/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(c.endpoint))setEndpoint(c.endpoint);}).catch(()=>{});},[]);
 const content=JSON.stringify(writing);
 const submissionId=useMemo(()=>crypto.randomUUID(),[content,lesson,level,classroom,studentNumber]);
 const payload=JSON.stringify({submissionId,classCode,classroom,studentNumber,lesson,level,writing});
 return <section className="teacher-export submission-panel"><div><b>선생님께 바로 제출하기</b><span>이름 대신 학생 번호를 입력해요. 작성한 문장과 점검 결과가 선생님의 구글 시트에 저장됩니다.</span></div><form method="post" action={endpoint||undefined} target="_blank" onSubmit={e=>{if(!endpoint||!writing.length||writing.some(v=>!v.trim())){e.preventDefault();return;}setSent(true);}}>
 <label>수업 코드<input required autoComplete="off" maxLength={40} value={classCode} onChange={e=>setClassCode(e.target.value)} placeholder="선생님이 알려 준 코드"/></label>
 <label>학급<input required autoComplete="off" maxLength={30} value={classroom} onChange={e=>setClassroom(e.target.value)} placeholder="예: 6학년 1반"/></label>
 <label>학생 번호<input required inputMode="numeric" pattern="[0-9]{1,3}" maxLength={3} autoComplete="off" value={studentNumber} onChange={e=>setStudentNumber(e.target.value)} placeholder="예: 7"/></label>
 <input type="hidden" name="payload" value={payload}/><button className="primary" disabled={!endpoint||!writing.length||writing.some(v=>!v.trim())} type="submit">선생님께 제출 · 새 창</button>
 {!endpoint&&<p>선생님이 제출 기능을 연결하고 있어요. 현재는 아래 CSV로 결과를 저장할 수 있습니다.</p>}
 {sent&&<p role="status">새 창의 ‘제출 완료’를 확인해 주세요. 완료 안내가 없으면 저장되지 않았을 수 있어요. 수업 코드를 확인하고 다시 제출해 주세요.</p>}
 </form></section>;
}
