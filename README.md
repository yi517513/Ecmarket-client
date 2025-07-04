# ECmarket 前端專案（Frontend）

此專案為 C2C 電商平台「ECmarket」的前端實作，支援買賣雙方刊登商品、下單交易、即時通知、訂單管理等功能。
專案採前後端分離架構，前端以 React + Vite 製作，搭配 RESTful API 與 Socket.IO 提供完整即時互動體驗。

👉 **線上體驗 DEMO**： [ECmarket 商城](https://yi517513-ecmarket-client.zeabur.app/) 🔗

---

## 專案特色

- 使用者登入 / 註冊 / 權限驗證（JWT）
- 商品刊登、查詢與詳情檢視
- 訂單建立、付款流程、交易狀態視覺化
- 雙向聊天室（Socket.IO）
- 個人中心、商品管理、交易記錄

---

## 使用技術

- **React 18 + Vite**：建構快速且現代化的前端應用
- **React Router DOM**：實現多頁面路由切換
- **Zustand**：集中式狀態管理
- **Axios**：處理 HTTP API 請求
- **Socket.IO Client**：即時訊息處理
- **Hook Form + Zod**：表單管理與驗證
- **React Toastify**：彈跳通知提示系統
- **Tailwind CSS**：快速、原子化的 CSS 樣式設計
- **lodash.debounce**： 限制函式執行頻率，避免過度觸發 API 請求
- **tanstack/react-query**：用於管理伺服器狀態、快取與自動重新請求，簡化非同步資料的讀取與更新流程

---

## 測試資訊（Demo 專用）

### 測試帳號

| 帳號             | 密碼      | Uid    |
| ---------------- | --------- | ------ |
| test01@gmail.com | !@#test01 | 100001 |
| test02@gmail.com | !@#test02 | 100002 |

> 可使用這些帳號登入體驗買賣與即時通訊功能

---

### 測試信用卡資訊（付款用）

- 當 訂單金額高於 NT$50,000 時，不支援「網路 ATM」付款方式。請改用以下測試用信用卡進行模擬付款

| 項目      | 資訊說明                                           |
| --------- | -------------------------------------------------- |
| 卡號      | `4311-9511-1111-1111`                              |
| 安全碼    | 任意 3 位數字（如 123）                            |
| 有效月/年 | 請輸入**大於當下時間**的月份與年份（如 `12/2026`） |

> 此為測試用信用卡資訊，僅用於模擬付款，不會產生實際交易。

---

### 註冊驗證碼說明

註冊新帳號時，驗證碼會寄送至您填寫的**真實信箱**，請前往收信並完成驗證後即可登入。

---

## 搭配後端

此前端專案需搭配後端運作：

👉 [後端專案 GitHub 連結（ECmarket Backend）](https://github.com/yi517513/Ecmarket-server)
