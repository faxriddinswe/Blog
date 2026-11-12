# 🐧 Linux Olamini Kashf Qilamiz!

Bugun siz bilan Linux olamini kashf qilamiz. Nima uchun Linux xavfsizligi, boshqaruv, fayllar, buyruqlar va umuman Linux olami haqida o'rganib chiqamiz.

> 💡 **Eslatish:** Ushbu postdagi amaliy ishlarni bajarish uchun kompyuteringizga Linux o'rnatishingiz shart emas — [Docker Playground](https://labs.play-with-docker.com/) xizmatidan foydalanishingiz mumkin.

---

## 🛠️ Intro (Kirish)

Linux olamida **2 ta asosiy tushunchani** juda yaxshi bilishingiz shart: **SHELL** va **KERNEL** *(post oxirida bu haqda chuqurroq gaplashamiz)*.

* 🧠 **KERNEL** — Kompyuteringizni to'liq boshqaruvchi tizim (yadro).
* 🗣️ **SHELL** — Sizning KERNEL bilan muloqot qilishingizni ta'minlovchi til/qobiq. Siz uni ba'zan `bash`, `zsh` yoki `fish` nomi bilan eshitgansiz.

> **Oddiy mantiq:** Biz SHELL'ga buyruq yozamiz ➔ U buyrug'imizni KERNEL'ga tushuntiradi ➔ Kompyuterimiz biz aytgan ishni bajaradi.

---

## 📦 Package Management (Dasturlarni o'rnatish)

Bizda yangi tandirdan uzilgan Linux kompyuteri bor deylik, ammo unda bizga kerakli dasturlar yo'q. Keling, ularni o'rnatamiz. Bunda bizga paket menejerlari: `apt`, `apt-get`, `apk` yoki `yum` buyruqlaridan biri kerak bo'ladi.

Keling, `ipython` dasturini o'rnatib ko'ramiz:

* **Linux Alpine** tizimida `apk` ishlatiladi:
  ```bash
  apk add ipython
  ```
* **Ubuntu** tizimida `apt` yoki `apt-get` ishlatiladi.

> ⚠️ **Muhim:** Ubuntuda `apt install` qilishdan oldin bir marotaba paketlar ro'yxatini yangilab olishingiz kerak:
> ```bash
> apt update
> ```
> Chunki paket menejeri odatda eski URL versiyalari bilan keladi. Ularni yangilab olmaguningizcha to'g'ri versiyadagi dasturlarni yuklab bera olmaydi.

---

## 📁 File System (Fayllar tizimi)

Fayllarning turlari ko'p: `.txt`, `.mp3`, `.jpeg`, `.png` va h.k. Directory'ni esa siz papka deb ataysiz. 

Quyida Linux operatsion tizimidagi asosiy kataloglar (directory) va ularning vazifalari keltirilgan:

| Directory | Description |
| :--- | :--- |
| **`/bin`** | Binary or executable programs. |
| **`/etc`** | System configuration files. |
| **`/home`** | Home directory, where your personal files reside. |
| **`/opt`** | Optional or third-party software. |
| **`/tmp`** | Temporary space, typically cleared on reboot. |
| **`/usr`** | User-related programs. |
| **`/var`** | Log files and variable data. |

> 📚 **Tavsiya:** Fayllar bilan ishlashni mukammal o'rganish uchun eng yaxshi manba — **42.uz Express Backend** kursidagi Linux bo'limi.

---

## 🔐 Access Control (Kirishni boshqarish)

Adashib *Cloud Administrator* lavozimiga ishga qabul qilindingiz deylik 😅. Endi bo'yningizda katta mas'uliyat bor: tizimni xavfsiz holatda boshqarib turish.

Ishxonangizdagi dasturchilar sizdan ruxsat (*dostup*) so'rashdi, xo'sh nima qilasiz?
* **Siz:** `root` huquqini beraman.
* **Men:** Yo'o'o'o'o'q, unday qilmang! 🚫

Undan ko'ra o'sha foydalanuvchi uchun alohida user ochib bering va undan ba'zi imkoniyatlarni cheklang. User ochish uchun oddiy `adduser` buyrug'i kifoya:

```bash
adduser <username>
```

Yangi foydalanuvchi yaratganingizda u o'ziga tegishli bo'lgan fayllarni o'qiy oladi, yoza oladi va `execute` (ishga tushirish) qila oladi. Ammo boshqa tizim fayllariga kirib ularni o'zgartira olmaydi.

Agar siz ushbu foydalanuvchiga ishonsangiz, unga super user huquqini berishingiz mumkin, ya'ni **`sudo`** (*Super User Do*). Linux'da guruhlar tushunchasi mavjud. Foydalanuvchi o'zi a'zo bo'lgan guruh imkoniyatlaridan foydalana oladi. Biz `sudo` imkoniyatini berish uchun foydalanuvchini `sudoers` (yoki `sudo`) guruhiga qo'shishimiz kerak:

```bash
# usermod buyrug'i orqali foydalanuvchini sudo guruhiga qo'shish
usermod -a -G sudo <username>
```

Endi o'sha user `sudo` buyrug'idan foydalanib ma'lumotlarni boshqara oladi. Guruhlar mavzusini chuqurroq o'rgansangiz, tizimni to'g'ri boshqarishni egallaysiz. *(Aytgancha, sudo qila olaman deb har xil keraksiz buyruqlarni ishlatib yubormang-a...)* 😉

---

## ⚡ Process Control (Jarayonlarni boshqarish)

Linux operatsion tizimida har bir dastur ishlab turishi uchun yangi **Process** (jarayon) yaratiladi va u boshqalaridan ajralib turishi uchun maxsus IDga ega bo'ladi. Biz uni **PID** (*Process ID*) deb ataymiz.

Siz kimgadir ruxsat berdingiz, u dasturini ishga tushirib yoki biror g'alati ishlar qilib resurslarni (RAM, CPU yoki Storage) uvol qilmoqda. Ammo aynan qaysi dastur resursni ko'p ishlatayotganini bilmayapsiz.

Buning uchun yordamga **`top`** yoki **`htop`** buyruqlari keladi:
* Ular orqali qaysi dastur resurslarni qancha ishlatayotganini real vaqt rejimida kuzatishingiz mumkin.

Xo'sh, muammoli dasturni topdingiz va PID nomerini ham aniqladigiz. Endi uni qanday o'chirasiz? Albatta **`kill`** buyrug'i yordamida!

`kill` buyrug'i orqali process'larga turli xil signallar yuborishingiz mumkin. Eng qiziq tomoni: `kill` dasturni o'zi to'g'ridan-to'g'ri to'xtatmaydi, shunchaki unga signal yetkazadi. Dastur esa signal turiga qarab javob qaytaradi:

```bash
kill <signal> <PID>
```

* **`-9` signali (`SIGKILL`):** Dasturni majburiy va zudlik bilan o'chirishni buyuradi.
* **`-20` signali (`SIGTSTP`):** Process'ni vaqtincha to me'yorida to'xtatadi (*suspend* qiladi).

To'xtagan dasturni qolgan joyidan davom ettirish uchun:
```bash
fg <PID>
```
buyrug'i kifoya qiladi. Qolgan signallarni ham albatta amalda sinab ko'ring!

---

## 📌 Conclusion (Xulosa)

Keyingi sonlarda sizlar bilan yosh **Hacker**larning nayranglari va Linux'ning eng qorong'u qismlari haqida batafsil amaliyotlar bilan o'rganamiz. 

> 💙 **Sharing is caring** — Postni Linux'ga qiziquvchi do'stlaringizga ham ulashib (share qilib) qo'ying!