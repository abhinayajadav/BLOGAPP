"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[230],{6230:(e,t,a)=>{a.r(t),a.d(t,{default:()=>i});var s=a(4858),l=a(3003),c=a(6213),r=a(5043),n=a(3216),o=a(579);const i=function(){let{register:e,handleSubmit:t}=(0,s.mN)(),{currentUser:a}=(0,l.d4)((e=>e.userAuthorLoginReducer)),[i,d]=(0,r.useState)(""),m=(0,n.Zp)(),h=localStorage.getItem("token");const u=c.A.create({headers:{Authorization:"Bearer ".concat(h)}});return(0,o.jsx)("div",{className:"container ",children:(0,o.jsx)("div",{className:"row justify-content-center mt-5",children:(0,o.jsx)("div",{className:"col-lg-8 col-md-8 col-sm-10",children:(0,o.jsxs)("div",{className:"card shadow",children:[(0,o.jsx)("div",{className:"card-title text-center border-bottom",children:(0,o.jsx)("h2",{className:"p-3 bg-info",children:"Write an Article"})}),(0,o.jsx)("div",{className:"card-body bg-light",children:(0,o.jsxs)("form",{onSubmit:t((async e=>{e.dateOfCreation=new Date,e.dateOfModification=new Date,e.articleId=Date.now().toString(),e.username=a.username,e.comments=[],e.status=!0;let t=await u.post("http://localhost:4000/author-api/articles",e);console.log(t.data),"new article added"===t.data.message?m("/author-profile/articles-by-author/".concat(a.username)):d(t.data.message)})),children:[(0,o.jsxs)("div",{className:"mb-4",children:[(0,o.jsx)("label",{htmlFor:"title",className:"form-label",children:"Title"}),(0,o.jsx)("input",{type:"text",className:"form-control",id:"title",...e("title")})]}),(0,o.jsxs)("div",{className:"mb-4",children:[(0,o.jsx)("label",{htmlFor:"category",className:"form-label",children:"Select a category"}),(0,o.jsxs)("select",{...e("category"),id:"category",className:"form-select",children:[(0,o.jsx)("option",{value:"programming",children:"Programming"}),(0,o.jsx)("option",{value:"AI&ML",children:"AI&ML"}),(0,o.jsx)("option",{value:"database",children:"Database"})]})]}),(0,o.jsxs)("div",{className:"mb-4",children:[(0,o.jsx)("label",{htmlFor:"content",className:"form-label",children:"Content"}),(0,o.jsx)("textarea",{...e("content"),className:"form-control",id:"content",rows:"10"})]}),(0,o.jsx)("div",{className:"text-end text-black",children:(0,o.jsx)("button",{type:"submit",className:"text-black p-2 rounded btn-info",children:"Post"})})]})})]})})})})}}}]);
//# sourceMappingURL=230.9f9a36b0.chunk.js.map