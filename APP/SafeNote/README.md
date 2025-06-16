# MJSEC CTF 2025 – SafeNotes

**Insecure Local Storage**

---

## 📌 기술 스택 (Tech Stack)

| 분야        | 사용 기술 / 도구                            |
|-------------|--------------------------------------------|
| 플랫폼      | Android (API 21+)                          |
| 언어        | Java / Kotlin                              |
| 빌드 도구   | Gradle (Wrapper 사용)                      |
| 역공학 도구 | ADB, jadx, apktool, HxD (Hex Editor) 등    |

---

## 📝 문제 설명

“SafeNotes” 앱은 사용자가 비밀 노트를 저장할 수 있는 Android 애플리케이션입니다.  
하지만 개발자는 SharedPreferences에 로그인 토큰(플래그)을 단순 Base64 인코딩만 해둔 치명적 실수를 범했습니다.  
APK를 리버스엔지니어링 및 디버깅하여, 숨겨진 플래그를 찾아보세요!

> *“내 노트는 안전하다구요? 정말?”*

---

## 📂 제공 파일

- `SafeNotes.apk`  

---

## 🎯 참가자 과제

1. APK를 디컴파일(jadx) 또는 디스어셈블(apktool) 합니다.  
2. 패키지명 `com.example.safenotes` 의 `MainActivity` 또는 SharedPreferences 초기화 코드를 찾아봅니다.  
3. SharedPreferences 키 `secret_note` 에 저장된 Base64 문자열을 획득합니다.  
4. Base64 디코딩을 통해 최종 플래그를 확인합니다.
