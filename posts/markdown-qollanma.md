Bu post — **jonli qo'llanma**. Uni ochib, `posts/markdown-qollanma.md` faylini yonma-yon qo'ysangiz, har bir narsa qanday yozilganini ko'rasiz.

## Sarlavhalar

Sarlavha `#` belgisi bilan yoziladi. Nechta `#` bo'lsa, shuncha kichik sarlavha:

```
## Katta bo'lim
### Kichikroq bo'lim
```

### Bu uchinchi darajali sarlavha

## Matn bezaklari

- `**qalin**` → **qalin matn**
- `*qiya*` → *qiya matn*
- Bir qatorli kod: `` `System.out.println()` `` → `System.out.println()`

## Ro'yxatlar

Oddiy ro'yxat `-` bilan:

- Birinchi element
- Ikkinchi element
- Uchinchi element

Raqamli ro'yxat:

1. Loyihani ochish
2. Kod yozish
3. Deploy qilish

## Iqtibos (quote)

Iqtibos `>` belgisi bilan yoziladi. Chap tomonida sariq chiziq chiqadi:

> "Bitta foydalanuvchi har bitta harfni bosganda bazaga so'rov ketayotgan bo'lsa, bir vaqtning o'zida 1 million odam yozganda baza portlab ketmaydimi?"

## Kod bloklari

Uch dona teskari qo'shtirnoq (```) orasiga kod yoziladi. Til nomini yozsangiz, kod avtomatik ranglanadi:

```java
public class Main {
    public static void main(String[] args) {
        // Bu Java kodi — ranglar avtomatik qo'yiladi
        String name = "Abdukarim";
        System.out.println("Salom, " + name + "!");
    }
}
```

```python
# Python ham ishlaydi
def greet(name: str) -> str:
    return f"Salom, {name}!"

print(greet("Abdukarim"))
```

```sql
-- SQL ham
SELECT username FROM users WHERE username = 'akarshiev27';
```

## Rasm qo'shish

Rasmni `posts/images/` papkasiga tashlang, keyin shunday yozing:

```
![Rasm tavsifi](posts/images/rasm-nomi.png)
```

Namuna (rasm mavjud bo'lsa ko'rinadi):

![Namuna rasm](posts/images/example.png)

Internetdagi rasmni ham qo'yish mumkin:

```
![Tavsif](https://example.com/rasm.png)
```

## Link qo'shish

```
[GitHub sahifam](https://github.com/akarshiev)
```

Natija: [GitHub sahifam](https://github.com/akarshiev)

## Jadval

| Buyruq | Vazifasi |
|--------|----------|
| `git add .` | O'zgarishlarni tayyorlash |
| `git commit -m "msg"` | Saqlash |
| `git push` | GitHub'ga yuborish |

## Chiziq bilan ajratish

Uch dona chiziqcha yozsangiz gorizontal chiziq chiqadi:

---

Tamom! Endi o'zingizning postingizni yozing. Qanday qo'shishni bilmasangiz — asosiy papkadagi **README.md** faylini o'qing.
