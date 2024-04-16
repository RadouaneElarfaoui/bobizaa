/*
import {search, download} from 'aptoide-scraper';
const handler = async (m, {conn, usedPrefix: prefix, command, text}) => {
 if (!text) throw `معشوق الجماهير هذا الأمر خاص بتحميل التطبيقات المجانية والمدفوعة منها نكتب هكذا على سبيل المثال \n*.apk facebbok lite*`;
  try {    
    const searchA = await search(text);
    const data5 = await download(searchA[0].id);
    let response = `📲 تحميل التطبيقات 📲\n\n📌 *اسم التطبيق:* ${data5.name}\n📦 *الباكيدج:* ${data5.package}\n🕒 *تحذيث رقم:* ${data5.lastup}\n📥 *حجم التطبيق:* ${data5.size}\n\nما الذي يجعلك لا تتابع  صاحب البوت يا عزيزي  😄نورالدين يحب من يستعمل بوتاته لذا تابعه في حساباته \ninstagram.com/noureddine_ouafy`
    await conn.sendMessage(m.chat, {image: {url: data5.icon}, caption: response}, {quoted: m});
 if (data5.size.includes('GB') || data5.size.replace(' MB', '') > 999) {
      return await conn.sendMessage(m.chat, {text: '*[ 😁 ]الملف كبير جدًا لذا لن يتم إرساله.'}, {quoted: m});
    }
    await conn.sendMessage(m.chat, {document: {url: data5.dllink}, mimetype: 'application/vnd.android.package-archive', fileName: data5.name + '.apk', caption: null}, {quoted: m});
  } catch {
    throw `*[😒] خطأ، لم يتم العثور على نتائج لبحثك.*`;
  }    
};
handler.help = ["apk"]
handler.tags = ["applications"]
handler.command = ["apk"] 
export default handler;


*/
///*====≈============

import fetch from 'node-fetch';
import cheerio from 'cheerio';

const handler = async (m, { conn, text }) => {
    if (!text) throw `يرجى تحديد اسم التطبيق الذي ترغب في البحث عنه.`;
    
    try {
        const url = `https://witanime.cyou/episode/one-piece-%D8%A7%D9%84%D8%AD%D9%84%D9%82%D8%A9-${text}/`;
        const response = await fetch(url);
        const html = await response.text();

        const $ = cheerio.load(html);
        const apkLink = $//$('a').filter((i, el) => $(el).text().toLowerCase().includes('mediafire')).attr('href');

        if (apkLink) {
            await conn.sendMessage(m.chat, `تم العثور على رابط التطبيق:\n${apkLink}`, m);
        } else {
            throw `لم يتم العثور على رابط لتحميل التطبيق في هذا الرابط.`;
        }
    } catch (e) {
        console.error(e);
        throw `حدث خطأ أثناء البحث عن رابط التطبيق. يُرجى المحاولة مرة أخرى لاحقًا.`;
    }
};

handler.help = ['apk'];
handler.tags = ['applications'];
handler.command = ['apk'];

export default handler;


//*/
