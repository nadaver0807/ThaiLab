# Comprehensive System Prompt: Thai Chef E-commerce & Management Platform

## 1. Architecture & Tech Stack
- **Frontend:** React, TypeScript, Material UI (MUI), React Hook Form.
- **Backend:** Node.js, Express, TypeScript.
- **Database:** PostgreSQL with TypeORM.
- **Real-time Engine:** Server-Sent Events (SSE) for zero-latency kitchen order sync.
- **Infrastructure & Deployment:** Kubernetes (AWS EKS), GitOps via ArgoCD, secret management via HashiCorp Vault. Dockerized services for distinct client and admin portals.

## 2. UI/UX Specifications & Inspirations
### Visual Identity (Inspiration: Thai House)
- **Atmosphere:** Authentic, warm, and personal. Avoid corporate or sterile restaurant templates. 
- **Color Palette:** Earthy tones, dark woods, accented with vibrant colors of Thai cuisine (e.g., deep chili red, fresh lime/coriander green) to create a culinary mood.
- **Hero Section:** Full-width, slow-fading image carousel (`<HeroCarousel />`). Strictly no video to ensure fast load times and a clean UI. Images should transition slowly, showcasing both the high-quality food and the chef in action.

### Ordering Experience (Inspiration: Uma Sushi)
- **Mobile-First Navigation:** Implement a fixed bottom action bar (`<BottomOrderBar />`) on mobile view. This bar must constantly show the cart total, item count, and a prominent "Checkout" button, exactly like Uma Sushi's frictionless flow.
- **Sticky Category Tabs:** The 3 main categories ("Takeaway & Delivery", "Tasting Menus", "Catering & Private Events") must be prominently placed. When scrolling down the menu, a category navigation bar should stick to the top (`position: sticky`) for rapid jumping between sections.
- **Item Cards:** Clean, image-focused product cards with simple `+ / -` toggles. Opening an item should allow for easy customizations (e.g., spice level, extra rice) without leaving the page context (use Modals or Bottom Sheets).

## 3. Brand & Personalization Features
- **The Chef's Core:** A dedicated `<ChefStory />` component on the homepage highlighting the chef's personal journey, philosophy, and authentic photos. The copy and layout should communicate that customers are ordering from a personal, curated kitchen.
- **Customer Reviews:** A dedicated, elegant `<ReviewsSection />` to build trust, with potential for future API integration (e.g., Google Reviews).

## 4. Operational & Kitchen Management (Back-Office)
### Live Kitchen Dashboard
- **SSE Implementation:** The dashboard must maintain an active SSE connection listening for `new_order` and `order_updated` events to prevent polling overhead.
- **Ticket (Bon) Generation:** When an order is confirmed, generate a formatted layout for kitchen displays/printers. 
  - **Required Bon Data:** Order #, Exact Timestamp, Fulfillment Type (Delivery/Takeaway), Customer Name, List of Items (with variations/allergies heavily bolded).

### Automated Prep Labels (Smart Stickers)
- **Parsing Logic:** The system must parse an `Order` and extract individual `OrderItems` into distinct `Label` objects.
- **Execution:** E.g., `Order { items: [{name: "Red Curry", qty: 1}, {name: "Jasmine Rice", qty: 2}] }` must trigger a `LabelGenerationService` that outputs 3 distinct formatted labels.
- **Label Data:** Item Name, Order ID, Date/Time, and Customer Name/Phone.

### Customer Relationship Management (CRM) & Security
- **Customer Profiles:** Store order history, preferences, and basic contact info to build a loyal customer database.
- **Security & Payments:** Strictly PCI-compliant. Use tokenization (e.g., via browser autofill or a secure payment gateway iframe). Absolute rule: No raw credit card numbers are ever processed or stored in the PostgreSQL database.

## 5. Implementation Steps for AI Assistant
1. Initialize the monorepo structure.
2. Define TypeORM entities: `User`, `CustomerProfile`, `Order`, `OrderItem`, `Product`, `Category`.
3. Set up the Express backend, specifically the SSE routes (`/api/orders/stream`) and standard CRUD for products.
4. Create MUI Theme overrides reflecting the "Thai House" inspired palette.
5. Build the `BottomOrderBar` and `StickyCategoryNav` components reflecting the "Uma Sushi" mobile flow.
6. Implement the `LabelGenerationService` logic for order parsing.
