const express=require('express'),path=require('path');
const {TRUE_DATE,TRUE_ETAG,FLAG}=require('./config');
const app=express(),PORT=8000;

app.get('/flag.txt', (req, res) => {
  const ifMod = req.get('If-Modified-Since') || '';
  const ifNone = req.get('If-None-Match') || '';
  const logs = require('./public/logs.json');

  const dummy = logs.find(l => l.path === '/flag.txt' && (l.etag === ifNone || l.date === ifMod));
  if (dummy) {
    if (dummy.status === 304 && (dummy.etag === 'etag6853' || dummy.date === 'Thu, 19 May 2022 07:33:50 GMT')) {
      return res.status(304).set({ 'X-From-Cache': 'True', 'X-Flag': FLAG }).send();
    }
    return res.sendStatus(dummy.status);
  }

  if (ifMod === TRUE_DATE || ifNone === TRUE_ETAG) {
    return res.status(304).set({ 'X-From-Cache': 'True', 'X-Flag': FLAG }).send();
  }

  return res.status(410).type('html').sendFile(path.join(__dirname, 'public', 'deleted.html'));
});

app.use(express.static(path.join(__dirname,'public')));
app.listen(PORT,()=>console.log('🧠 Listening on http://localhost:'+PORT));