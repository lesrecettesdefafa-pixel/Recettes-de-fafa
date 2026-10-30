// Adaptation du relais NiftyVid, copyright (c) Igor Lima, licence MIT.
// Configuration et publication séparées pour Les recettes de Fafa Pixel.
const HF = "https://cbensimon-wan2-2-fp8da-aoti-preview2.hf.space";
const ALLOWED = new Set(["https://lesrecettesdefafa-pixel.github.io","https://fafa-pixel-relais.frostydaisy5.chatgpt.site"]);
const NEGATIVE = "extra hands, extra fingers, deformed hands, floating objects, face, text, subtitles, timestamp, timer, watermark, camera movement, static image";
const json = (body,status=200)=>new Response(JSON.stringify(body),{status,headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store"}});
const cors = (res,origin)=>{
 const h=new Headers(res.headers);if(ALLOWED.has(origin)){h.set("Access-Control-Allow-Origin",origin);h.set("Vary","Origin");}
 h.set("Access-Control-Allow-Methods","GET, POST, OPTIONS");h.set("Access-Control-Allow-Headers","Content-Type, Range");
 h.set("Access-Control-Expose-Headers","Content-Length, Content-Range, Content-Disposition");
 return new Response(res.body,{status:res.status,headers:h});
};
async function checkedFetch(url,opts={}) {
 const res=await fetch(url,{...opts,signal:AbortSignal.timeout(45000)});
 if(!res.ok){const detail=(await res.text()).slice(0,350);throw new Error("Moteur Wan : HTTP "+res.status+". "+detail);}
 return res;
}
export default {
 async fetch(req) {
  const u=new URL(req.url),origin=req.headers.get("Origin")||"";
  try {
   if(req.method==="OPTIONS")return cors(new Response(null,{status:ALLOWED.has(origin)?204:403}),origin);
   if(req.method==="GET"&&u.pathname==="/health")return cors(json({ok:true,studio:"fafa-pixel",engine:"Wan 2.2 — Space public, quotas variables",upstream:HF}),origin);
   if(req.method==="GET"&&u.pathname==="/"){
    return new Response('<!doctype html><html lang="fr"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Fafa Pixel — relais vidéo</title><body style="font:18px system-ui;max-width:650px;margin:60px auto;padding:20px"><h1>Fafa Pixel · Relais vidéo</h1><p>Relais indépendant en service. Le calcul Wan 2.2 utilise un Space public Hugging Face, avec quotas et disponibilité variables.</p><p><a href="https://lesrecettesdefafa-pixel.github.io/Recettes-de-fafa/">Ouvrir le studio Pixel</a></p><p>Adapté du relais NiftyVid d’Igor Lima (MIT).</p></body></html>',{headers:{"Content-Type":"text/html; charset=utf-8"}});
   }
   if(req.method==="GET"&&u.pathname==="/download"){
    const target=new URL(u.searchParams.get("url")||"",HF);
    if(target.origin!==HF||!target.pathname.startsWith("/gradio_api/file=")||target.username||target.password) return cors(json({error:"Adresse vidéo non autorisée."},400),origin);
    const upstream=await checkedFetch(target.toString(),{headers:req.headers.has("Range")?{Range:req.headers.get("Range")}:{},redirect:"error"});
    const h=new Headers({"Content-Type":"video/mp4","Cache-Control":"no-store","Content-Disposition":'attachment; filename="fafa-pixel-9x16.mp4"',"X-Content-Type-Options":"nosniff"});
    for(const n of ["Content-Length","Content-Range","Accept-Ranges"])if(upstream.headers.has(n))h.set(n,upstream.headers.get(n));
    return cors(new Response(upstream.body,{status:upstream.status,headers:h}),origin);
   }
   if(req.method==="POST"&&u.pathname==="/generate"){
    if(!ALLOWED.has(origin))return json({error:"Origine non autorisée."},403);
    const length=Number(req.headers.get("Content-Length")||0);
    if(length>9*1024*1024)return cors(json({error:"Image trop volumineuse."},413),origin);
    const form=await req.formData(),image=form.get("image");
    if(!(image instanceof File)||!["image/jpeg","image/png","image/webp"].includes(image.type)||image.size>8*1024*1024||!image.size)return cors(json({error:"Image PNG, JPG ou WebP requise (8 Mo maximum)."},400),origin);
    let p;try{p=JSON.parse(form.get("params")||"{}");}catch{return cors(json({error:"Paramètres invalides."},400),origin);}
    if(!p||typeof p!=="object"||typeof p.prompt!=="string"||!p.prompt.trim()||p.prompt.length>2500)return cors(json({error:"Décris le geste en moins de 2 500 caractères."},400),origin);
    const duration=Number(p.duration_seconds??2),steps=Number(p.steps??6);
    if(!Number.isFinite(duration)||duration<0.5||duration>4.5||!Number.isInteger(steps)||steps<4||steps>12)return cors(json({error:"Durée : 0,5 à 4,5 s ; étapes : 4 à 12."},400),origin);
    const upload=new FormData();upload.append("files",image,image.name||"fafa-pixel.jpg");
    const paths=await (await checkedFetch(HF+"/gradio_api/upload",{method:"POST",body:upload})).json();
    if(!Array.isArray(paths)||typeof paths[0]!=="string")throw Error("Réponse d’import du moteur invalide.");
    const data=[{path:paths[0],url:HF+"/gradio_api/file="+paths[0],orig_name:"fafa-pixel.jpg",meta:{_type:"gradio.FileData"}},null,p.prompt.trim(),steps,NEGATIVE,duration,1,1,42,true,6,"UniPCMultistep",3,16,false,true];
    const job=await (await checkedFetch(HF+"/gradio_api/call/generate_video",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({data})})).json();
    if(typeof job.event_id!=="string"||!/^[a-zA-Z0-9_-]+$/.test(job.event_id))throw Error("Le moteur n’a pas fourni de numéro de tâche.");
    const upstream=await checkedFetch(HF+"/gradio_api/call/generate_video/"+job.event_id,{headers:{Accept:"text/event-stream"}});
    return cors(new Response(upstream.body,{headers:{"Content-Type":"text/event-stream; charset=utf-8","Cache-Control":"no-cache, no-transform","X-Accel-Buffering":"no"}}),origin);
   }
   return cors(json({error:"Route inconnue."},404),origin);
  } catch(e){return cors(json({error:e?.message||"Le moteur est indisponible."},502),origin);}
 }
};

