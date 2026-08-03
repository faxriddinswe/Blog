

Python dasturlash tilida yaxshiroq kod yozish uchun siz ushbu mavzuni <br> yaxshi tushunishingiz kerak.

Postda kamchiliklar bo'lishi aniq. Iltimos o'zingiz ham qidirib, o'rganib ko'ring!

![](posts/images/garbage.png)

## Garbage collection

Ahlat yig'gich deb tarjima qilsak bo'ladi. Demak quyidagicha savol paydo bo'ladi, qachon biror narsani ahlat deya olasiz? Agar siz ushbu matoh yoki obyektdan boshqa foydalana olmasangiz siz uni ahlat deb xisoblashni boshlaysiz, juda oddiy. Xuddi shu jarayon dasturlash tillarida ham mavjud. Agar siz ishlatmoqchi bo'lgan qiymat yoki obyekt boshqa ishlatishga yaroqsiz bo'lib qolsa Garbage collector (ahlat yig'uvchi) uni ahlat deb oladi va uni xotiradan o'chirib (deallocates) yuboradi.

Ammo bizga garbage collectorni nima keragi bor? Agar u bo'lmaganida xotira to'lib ketardi. Agar kompyuteringiz xotirasi yuqoridagi rasmdagidek bo'lishini istamasangiz sizga garbage collector albatta kerak 🙃.

## Reference count

Inson sifatida bizga ahlatni tushunish aniq. Bir bakalashka suv sotib olasiz, suvini ichasiz va bakalashka bilan hech nima qila olmasligingizni bilasiz va uni ahlatga aylanadi. Dasturlash tillarida esa qiymat/obyekt yaratilgach unga reference count ya'ni nechta o'zgaruvchi unga bog'langanini xisoblanishni boshlaydi. Misol uchun:

```python
a = 1
b = 1
print(a is b)  # True

c = 257
d = 257
print(c is d)  # False

m = "abc"
n = "abc"
print(m is n)  # True

x = "long string example"
y = "long string example"
print(x is y)  # True
```

```python
# xotirada 1 obyekti yaratildi ammo kompyuter uni qanday olishni bilmayabadi shuning uchun uni o'sha zahotiyoq o'chirib yuboradi
>>> 1
# x o'zgaruvchisi kompyuterga 1 ni olish uchun yo'lni ko'rsatadi
>>> x = 1
# x o'zida manzil saqlaydi va u manzil bizni 1 soniga olib boradi va print(x) funksiyamiz bizga 1ni ko'rsatadi
>>> print(x)
# qachonki o'zgaruvchini o'chirganingizda 1 ga bo'lgan yo'l yo'qoladi bu esa 1 endi ahlatga aynaldi.
del x
```

Menimcha o'zgaruvchilar (variable) qiymatni o'zida saqlaydi deb tushungansiz. Aslida esa o'zgaruvchilar qiymatga yo'l bo'lib beradi xolos. Ya'ni siz xni print(x) qilganizda x qiymatni bermaydi, balkim o'sha qiymatni qayerda turganini aytadi. Sahnani ortida esa dastur x bergan xotira manziliga boradi va o'sha qiymatni olib keladi va siz aytgan vazifa bajariladi. Shuning uchun bugundan o'zgaruvchilarni reference sifatida qarasangiz bo'ladi.

`sys` standart kutubxonasi tizim yoki interpreter bilan bog'liq ishlarni bajarishda ishlatiladi (`os` operatsion tizim bilan ishlashda ishlatiladi). `sys.getrefcount()` funksiyasi orqali siz istalgan objectni nechta reference count'i borligini aniqlay olasiz. Ammo ushbu funksiya doim 1ta ortiqcha qiymat qaytaradi chunki o'zi ham o'sha obyektga reference qiladi uni reference'llar sonini aniqlash uchun. Shuning uchun ham 1 ayirib tashlasangiz haqiqiy qimat kelib chiqadi.

```python
import sys

x = [4, 3, 2, 1]
sys.getrefcount(x) # 2

y = x
sys.getrefcount(y) # 3

z = y
sys.getrefcount(z) # 4

# Agar siz z ga qiymat qo'shsangiz x ham, y ham o'zgarib qoladi. Chunki hamma o'zgaruvchilar bitta obyektga qaratilgan.
z.append(0)
print(x, y, z, sep="
")
# [4, 3, 2, 1, 0]
# [4, 3, 2, 1, 0]
# [4, 3, 2, 1, 0]

# Agar siz:
z = 1
# yoki
del z
sys.getrefcount(y) # 3
# chunki z endi [4, 3, 2, 1, 0] ga emas 1ga reference bo'ladi yoki o'chib ketayabdi.
```

```python
import sys

a = 10
b = a
print(sys.getrefcount(a) - 1)  # 2
```

Python dasturlash tili 2ta obyektni taqqoslashda $O(1)$ vaqt sarflashini bilasizmi? Ha noto'g'ri eshitmadingiz, Python obyektlarni qiymatini solishtirmaydi balkim xotirada qayerda turganini solishtiradi, TAMOM!

```python
import sys

a = 10
b = a
print(sys.getrefcount(a) - 1)  # 2

b = 20
print(sys.getrefcount(a) - 1)  # 1
```

## Finalizer

Finalizer - ob'ekt yo'q qilinayotganda (Garbage collector tomonidan) bajarilishi kerak bo'lgan tozalash ishlarini aniqlash imkonini beruvchi mexanizm. Buni `__del__` metodi yoki `weakref.finalize` funksiyasi yordamida amalga oshirish mumkin. Qisqa qilib aytganda `del object` qilganingizda ishga tushadi. Ammo Python `del object` qilganingizda uni o'chirishni kafolatlamaydi. [python doc]

```python
class Node:
	def __init__(self, val):
		self.val = val
		self.next = None

x = Node(1)
y = Node(2)

x.next = y
y.next = x
```

Obyektlar bir-biriga reference bo'la olishi mumkin xuddi yuqoridagi rasm(code)dagidek, ayniqsa LinkedList, Graph yoki shunga o'xshash ma'lumot strukturalarini olib qarasak. Ushbu xolat cyclic reference deyiladi. Garbage collector cycle referenceni aniqlay olmasligi va uni o'chira olmasligi mumkin va bu memory leakga sabab bo'ladi. Uni o'chirish uchun 2ta strategiya mavjud `__dict__` yoki `weakref.finalizer()`. `obj.__dict__` qilganingizda obyektni barcha attributelarini sizga taqdim etadi va siz ularni o'chirishni bemalol automate qila olasiz va CPython ko'proq `__dict__` yo'li bilan ketadi.

```python
import ctypes
import gc

class PyObject(ctypes.Structure):
    _fields_ = [("refcnt", ctypes.c_long)]

gc.disable()  # Disable garbage collector
a = "Hello World"
address_of_a = id(a)

# Get reference count
print(PyObject.from_address(address_of_a).refcnt)  # 2

b = a
print(PyObject.from_address(address_of_a).refcnt)  # 3

c = a
print(PyObject.from_address(address_of_a).refcnt)  # 4

c = 10
print(PyObject.from_address(address_of_a).refcnt)  # 3

b = 10
print(PyObject.from_address(address_of_a).refcnt)  # 2

gc.enable()  # Re-enable garbage collector
```

Cyclic referencedagi eng yomon xolatlardan biri bu listga o'zini append qilish va bu cheksizlik degani. Lazy load xisobiga sizga boshida 8ta ichma-ich ko'rinadi, lekin ichiga kirsangiz ko'paib boraveradi.

```python
arr = []
arr.append(arr)
```

## Conclusion

### Stack

Yuqoridagidek error xabarni ko'rgansiz menimcha qiziqib ko'rmagansiz aynan nega bunday error qaytarishiga. Python kod execution uchun Stack ma'lumot strukturasidan foydalanadi. Stackdagi oltin qoida esa LIFO (Last In First Out). Yuqoridagi kodni `pop()` qilib uni execute qiladi, agar qandaydir xatolik yuz bersa sizga uni ketma-ketligini ko'rsatib bera oladi. Shunday qiziq narsa 😉.

Bu yerda weak reference, Garbage collector graph traversal algorithm va Stack haqida ham qidirib o'rganib ko'ring. Chunki python asosida bular ham ishlayabdi. Umid qilaman postdan nimadir o'rgana oldingiz.