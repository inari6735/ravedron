# Shopware API Integration - Ravedron

Ten projekt został rozszerzony o integrację z Shopware API, umożliwiając pobieranie rzeczywistych danych o produktach i kategoriach z Twojego sklepu Shopware.

## 🚀 Funkcje

- **Automatyczne pobieranie kategorii** - nawigacja w header jest dynamicznie generowana z Shopware
- **Rzeczywiste produkty** - ProductGrid wyświetla produkty z Twojego sklepu
- **Fallback content** - jeśli API nie odpowiada, wyświetlana jest statyczna zawartość
- **Loading states** - eleganckie wskaźniki ładowania
- **Error handling** - obsługa błędów z informacyjnymi komunikatami
- **TypeScript** - pełne wsparcie typów dla Shopware API

## 📋 Wymagania

- Shopware 6.4+ z włączonym Store API
- Access Token dla Store API
- Node.js 18+

## 🔧 Konfiguracja

### 1. Skopiuj plik środowiskowy

```bash
cp .env.example .env.local
```

### 2. Skonfiguruj zmienne środowiskowe

Edytuj `.env.local` i ustaw właściwe wartości:

```bash
# URL do Twojego Shopware
NEXT_PUBLIC_SHOPWARE_ENDPOINT=http://localhost:8000

# Access Token dla Store API
NEXT_PUBLIC_SHOPWARE_ACCESS_TOKEN=SWSCBHFSNTVMAWNZDNFKSHLAAQ
```

### 3. Uzyskaj Access Token z Shopware

#### Opcja A: Przez Admin Panel
1. Zaloguj się do Shopware Admin
2. Idź do `Settings > System > Integration`
3. Utwórz nową integrację z uprawnieniami Store API
4. Skopiuj Access Key

#### Opcja B: Przez bazę danych
```sql
-- Znajdź istniejący access key
SELECT access_key FROM sales_channel WHERE type_id = (
    SELECT id FROM sales_channel_type WHERE identifier = 'storefront'
) LIMIT 1;
```

### 4. Sprawdź połączenie

Uruchom projekt i sprawdź konsolę przeglądarki:

```bash
npm run dev
```

Jeśli wszystko działa poprawnie, zobaczysz:
- Kategorie z Shopware w nawigacji
- Produkty z Shopware w sekcji Featured Products
- Brak komunikatów błędów o połączeniu

## 📁 Struktura plików

```
src/
├── services/
│   └── shopware.ts          # Główny serwis API
├── hooks/
│   └── useShopware.ts       # React hooki do pobierania danych
├── types/
│   └── index.ts             # TypeScript typy (rozszerzone o Shopware)
└── components/
    ├── Header.tsx           # Header z dynamiczną nawigacją
    └── ProductGrid.tsx      # Grid z produktami z Shopware
```

## 🔍 Dostępne hooki

### `useCategories()`
```tsx
const { categories, loading, error } = useCategories();
```

### `useProducts(params)`
```tsx
const { products, total, loading, error } = useProducts({
  limit: 16,
  categoryId: 'category-id',
  search: 'search term'
});
```

### `useProduct(productId)`
```tsx
const { product, loading, error } = useProduct('product-id');
```

### `useShopwareConnection()`
```tsx
const { isConnected, loading, error } = useShopwareConnection();
```

## 🛠️ API Endpoints

Aplikacja używa następujących endpointów Shopware Store API:

- `POST /store-api/category` - pobieranie kategorii
- `POST /store-api/product` - pobieranie produktów
- `POST /store-api/product/{id}` - pobieranie pojedynczego produktu

## 🎨 Stylowanie

Komponenty zachowują oryginalny styl Ravedron:
- Czarne tło z czerwonymi akcentami
- Inter font
- Minimalistyczny design
- Responsive layout

## 🔄 Fallback Mode

Jeśli Shopware API nie jest dostępne:
- Wyświetlany jest komunikat o problemie z połączeniem
- Używane są statyczne dane z pliku `/src/data/index.ts`
- Wszystkie funkcje pozostają działające

## 🚨 Troubleshooting

### Problem: "Failed to connect to Shopware API"

1. Sprawdź czy Shopware działa na podanym URL
2. Zweryfikuj Access Token
3. Sprawdź czy Store API jest włączone
4. Sprawdź logi Shopware w `/var/log/`

### Problem: "No products available"

1. Sprawdź czy masz produkty w kategorii głównej
2. Zweryfikuj czy produkty są aktywne i widoczne
3. Sprawdź filtry kategorii

### Problem: "Navigation unavailable"

1. Sprawdź czy masz skonfigurowane kategorie
2. Zweryfikuj czy kategorie są aktywne i widoczne
2. Sprawdź strukturę kategorii (poziom ≤ 2)

## 🎯 Następne kroki

Możesz rozszerzyć integrację o:
- Koszyk (Store API Cart)
- Wyszukiwanie (Store API Search)
- Filtry produktów
- Szczegóły produktu
- Zarządzanie użytkownikami
- Płatności

## 📞 Wsparcie

Jeśli masz problemy z integracją, sprawdź:
1. Konsola przeglądarki (błędy JavaScript)
2. Network tab (błędy HTTP)
3. Logi Shopware
4. Konfiguracja CORS w Shopware
