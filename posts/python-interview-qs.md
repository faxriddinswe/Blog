
Agar Python dasturlash tilida kod yozsangiz va ushbu tilni yoqtirsangiz demak bu post siz uchun. Sizni hozir intervyu qilib ko'ramiz, va qanchalik bu tilni yaxshi bilishingizni aniqlab olamiz.

---

![Namuna rasm](posts/images/interview.png)

## 1-Savol
**Savol:** Pastdagi kod nima uchun bunday ishlashini tushuntirib bering:

```python
a = 256
b = 256
print(a is b) # True

x = 257
y = 257
print(x is y) # False
```

**Javob:** Python -5 — 256 oralig'idagi raqamlarni cache qiladi (Integer Caching / Small Integer Integer Interning). Buning javobini *Python Memory Management* posti orqali batafsil o'qib chiqishingiz mumkin.

---

## 2-Savol
**Savol:** Pythonda `import` qanday ishlaydi? Nima uchun pastdagi kod bunday natija qaytarayabdi?

```python
import math
print(math.pi) # 3.141592653589793

math.pi = 3
print(math.pi) # 3

import math
print(math.pi) # 3
```

**Javob:** Frozen modules, ya'ni Python interpreter siz import qilmoqchi bo'lgan modulni `sys.modules` dictionary'siga faqat bir marotaba yuklab oladi va uni qayta-qayta ishlatadi. Faqat bir marotaba yuklab olishini ko'zingiz bilan ko'rish uchun python3 interactive oynasini (terminalni oching va `python3`, enter tugmasini bosing) oching va `__hello__` modulini import qiling:

```python
import __hello__ # Hello world!
import __hello__ # prints nothing
```

---

## 3-Savol
**Savol:** `__pycache__` nima? Va uning ichidagi `.pyc` faylchi?

**Javob:** Har qanday Python dasturni ishga tushirganingizda, interpreter kodingizni bytecode'ga compile qiladi (jarayonni soddalashtirish uchun) va natijani `__pycache__` nomli folder'da saqlaydi.

Agar folder ichiga bir nazar solsangiz, `.pyc` yoki `.pyo` fayllarni ko'rasiz. Python interpreter kodlarni line-by-line o'qib ishga tushirmaydi, balkim cached `.pyc` bytecode'ni virtual mashinaga beradi. Virtual mashina uni bytecode instruksiyasiga qarab ishga tushiradi. Ha, Java dasturlash tilidagi jarayonga o'xshab ketadi.

---

## 4-Savol
**Savol:** Exception handling qilishni dasturni performance'iga qanday ta'siri bor? Agar u dasturni sekinlashtirsa qanday sekinlashishni oldini olgan bo'lardingiz?

**Javob:** Python exception handling uchun Stack ishlatadi. Qachonki exception yuzaga kelsa, interpreter call stack'dan exception handlerni qidiradi (`try-except` deb yozgan kodingizni). Agar handler yozmagan bo'lsangiz, Python dasturni terminate qiladi va traceback'ni print qilib terminalga chiqaradi.

Python sizni LBYL ("look before you leap") uslubidan ko'ra ko'proq, EAFP ("it's easier to ask for forgiveness than permission") uslubida kod yozishga undaydi. Kodingiz samarali va sodda bo'lishi uchun. Tasavvur qiling foydalanuvchilar dasturga raqamlar listini beradi `[1, 2, 3, 4]` va dastur uni summasini xisoblab foydalanuvchiga qaytaradi. Agar dasturda 90% xolatda foydalanuvchilar raqamli list kiritishiga amin bo'lsangiz `try-except` yozsangiz bo'ladi. Agar unday bo'lmasa `if-else` orqali control flow'ni boshqarganingiz yaxshiroq. (Shaxsiy tajriba va Core Python Developerlar maslahatidan)

---

## 5-Savol
**Savol:** Nima uchun pastdagi kod `False` qaytarayabdi? Axir ikkisini ham qiymati bir xil bo'lsa. Buni qanday to'g'rilagan bo'lardingiz?

```python
class Node:
	def __init__(self, val):
		self.val = val
		self.next = None

x = Node(1)
y = Node(1)
print(x == y) # False
```

**Javob:** Buning uchun 2ta yechim bor.

**Yechim-1:** Dunder methods ya'ni double underscore methods deb tarjima qilinadi.

```python
class Node:
	def __init__(self, val):
		self.val = val
		self.next = None

	# equal dunder metodi == operatori uchun javob beradi.
	# self objectni o'zi bo'lsa, other narigi obyekt degani ya'ni
	# self = Node(1) bo'lsa
	# other = Node(1) ham shunday va ikkisini val qiymatlarini solishtirasiz, TAMAM!
	def __eq__(self, other):
		return self.val == other.val

x = Node(1)
y = Node(1)
print(x == y) # True
```

**Yechim-2:** `dataclasses` moduli yordamga keladi. Agar yuqoridagidek barcha holatlar uchun dunder method yozishni istamasangiz `@dataclass` decoratorini ishlating, chunki u siz uchun kerakli dunder metodlarni o'zi yozib beradi.

```python
from dataclasses import dataclass

@dataclass
class Node:
	val: any
	next: None = None # default None bo'ladi, o'zgartirsa ham bo'ladi.

x = Node(1)
y = Node(1)
print(x == y) # True
```

---

## 6-Savol
**Savol:** Metaclass va class o'rtasida qanday farq bor? Metaclass yaratib ko'rsata olasizmi?

**Javob:** Class'lar object yaratishadi va class'larni o'zi ham object xisoblanadi. Metaclass class'lar yaratadi.

```python
MyClass = MetaClass() # Class yaratildi
my_object = MyClass() # Classdan object yaratildi

# type() sizga Metaclass yaratishda yordam beradi:
MyClass = type('MyClass', (), {})
# type(name, base, dict)
# name => class nomi
# base => base classlar uchun tuple
# dict => attributelar uchun dict

MyMetaClass = type("MySimpleClass", (), {"val": 12})
obj = MyMetaClass()
print(obj.val) # 12
```

---

## 7-Savol
**Savol:** Bizda 3 xil list mavjud:
* `list`,
* `collections.UserList`
* `np.array`

Agar biz `range(1, 10_000_000)` list yaratsak va sonlar yig'indisini `sum()` qilib tekshirsak oddiy `list()` millisekundlarda qolganlarga nisbatan juda tez xisoblayabdi. Savol nima uchun tez va qanday qilib bunchalik tez xisoblayabdi?

```python
import time
import numpy as np
from collections import UserList

regular_list = list(range(1, 10000000)) # Juda tez
np_list = np.array(range(1, 10000000)) # Sekin
user_list = UserList(range(1, 10000000)) # Eng sekini

start = time.perf_counter()
print("Sum of regular list:", sum(regular_list), f"Time taken:, {time.perf_counter() - start:.6f} seconds")

start = time.perf_counter()
print("Sum of NumPy array:", sum(np_list), f"Time taken:, {time.perf_counter() - start:.6f} seconds")

start = time.perf_counter() # np.sum() boshqa masala
print("np.sum of NumPy array:", np.sum(np_list), f"Time taken:, {time.perf_counter() - start:.6f} seconds")

start = time.perf_counter()
print("Sum of UserList:", sum(user_list), f"Time taken:, {time.perf_counter() - start:.6f} seconds")
```

**Javob:** Bu siz uchun maxsus savol edi. Javobini menga email orqali (fasxriddin_askbot) telegram botiga yuboring.

Post sizga maksimal foyda keltirishi uchun uni o'rganing va do'stlaringizga o'rgating (bo'lishing).