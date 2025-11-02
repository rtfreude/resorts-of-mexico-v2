# Component Library Roadmap
## Resorts of Mexico - Sanity Block Components

### Current State
**Existing Blocks:**
- ✅ Hero Block (full-width banner with CTA)
- ✅ Text Block (rich text with inline images)
- ✅ Image Block (standalone images with sizing options)
- ✅ CTA Block (call-to-action sections)
- ✅ Destination Grid Block (destination cards in grid)

---

## Phase 1: Essential Content Components

### 1.1 Text & Typography Blocks

#### **Heading Block**
- **Purpose:** Standalone heading with customization
- **Fields:**
  - Heading text (string)
  - Heading level (H1, H2, H3, H4, H5, H6)
  - Alignment (left, center, right)
  - Style variant (default, accent, eyebrow)
  - Spacing (top/bottom margin options)
- **Use Cases:** Section headers, chapter titles, dividers

#### **Quote Block**
- **Purpose:** Featured testimonials or pull quotes
- **Fields:**
  - Quote text (text)
  - Attribution/Author (string)
  - Author title/role (string)
  - Author image (image, optional)
  - Style (default, featured, boxed)
  - Alignment (left, center, right)
- **Use Cases:** Customer reviews, testimonials, highlighted statements

#### **Two-Column Text Block**
- **Purpose:** Side-by-side text sections
- **Fields:**
  - Left column content (portable text)
  - Right column content (portable text)
  - Column ratio (50/50, 60/40, 40/60, 70/30)
  - Vertical alignment (top, center, bottom)
  - Gap size (small, medium, large)
- **Use Cases:** Comparison content, benefits/features, Q&A format

### 1.2 Media Blocks

#### **Image Gallery Block**
- **Purpose:** Multiple images in various layouts
- **Fields:**
  - Images array (with alt, caption)
  - Layout style (grid, masonry, carousel, slideshow)
  - Columns (2, 3, 4, auto)
  - Gap size (small, medium, large)
  - Lightbox enabled (boolean)
  - Aspect ratio (1:1, 16:9, 4:3, original)
- **Use Cases:** Resort photos, room galleries, location showcases

#### **Video Block**
- **Purpose:** Embedded or uploaded video content
- **Fields:**
  - Video source (YouTube, Vimeo, direct upload)
  - Video URL or file
  - Thumbnail image (image, optional)
  - Aspect ratio (16:9, 4:3, 1:1, 21:9)
  - Autoplay (boolean)
  - Show controls (boolean)
  - Caption (string)
- **Use Cases:** Resort tours, destination videos, promotional content

#### **Image with Text Overlay Block**
- **Purpose:** Image with text positioned on top
- **Fields:**
  - Background image (image)
  - Overlay text (portable text, simplified)
  - Text position (9-point grid: top-left, center, bottom-right, etc.)
  - Overlay darkness (0-100%)
  - Text color (light, dark, auto)
- **Use Cases:** Feature highlights, promotional banners

### 1.3 Combined Content Blocks

#### **Text & Image Block**
- **Purpose:** Text alongside image (most versatile block)
- **Fields:**
  - Content (portable text)
  - Image (image with alt, caption)
  - Image position (left, right, top, bottom)
  - Image size (30%, 40%, 50%, 60%)
  - Vertical alignment (top, center, bottom)
  - Image style (rounded, squared, shadow)
  - Reverse on mobile (boolean)
- **Use Cases:** Feature descriptions, about sections, storytelling

#### **Split Content Block**
- **Purpose:** 50/50 split with flexible content types
- **Fields:**
  - Left content type (text, image, video, form)
  - Left content data (varies by type)
  - Right content type (text, image, video, form)
  - Right content data (varies by type)
  - Vertical alignment (top, center, bottom, stretch)
  - Background color (white, grey, primary, custom)
  - Full height (boolean)
- **Use Cases:** Landing pages, feature showcases, comparisons

#### **Card Grid Block**
- **Purpose:** Flexible grid of content cards
- **Fields:**
  - Cards array:
    - Icon (image or icon picker)
    - Title (string)
    - Description (text)
    - Link (CTA object, optional)
  - Columns (2, 3, 4, auto)
  - Card style (default, outlined, elevated, flat)
  - Icon position (top, left)
  - Text alignment (left, center)
- **Use Cases:** Services, features, benefits, category navigation

---

## Phase 2: Interactive & Specialty Components

### 2.1 Navigation & Wayfinding

#### **Accordion Block**
- **Purpose:** Collapsible FAQ or content sections
- **Fields:**
  - Items array:
    - Title (string)
    - Content (portable text)
  - Style (default, bordered, cards)
  - Allow multiple open (boolean)
  - First item open (boolean)
  - Icon style (plus/minus, chevron, custom)
- **Use Cases:** FAQs, detailed information, terms & conditions

#### **Tab Block**
- **Purpose:** Tabbed content sections
- **Fields:**
  - Tabs array:
    - Tab title (string)
    - Tab content (portable text or blocks)
  - Tab style (default, pills, underline)
  - Tab alignment (left, center, full-width)
  - Default active tab (number)
- **Use Cases:** Room types, pricing tiers, itinerary options

#### **Anchor Navigation Block**
- **Purpose:** Jump links to sections on same page
- **Fields:**
  - Links array:
    - Link text (string)
    - Anchor ID (string)
  - Style (horizontal, vertical, sticky)
  - Position (top, left sidebar)
- **Use Cases:** Long-form content, travel guides, resort pages

### 2.2 Data Display

#### **Stats Block**
- **Purpose:** Highlight key numbers/metrics
- **Fields:**
  - Stats array:
    - Number (string, allows for + or k/m suffix)
    - Label (string)
    - Icon (image or icon, optional)
  - Columns (2, 3, 4, 5, auto)
  - Style (minimal, boxed, highlighted)
  - Alignment (left, center, right)
  - Animated count-up (boolean)
- **Use Cases:** Resort features, destination highlights, achievements

#### **Comparison Table Block**
- **Purpose:** Side-by-side comparison
- **Fields:**
  - Columns array (product/option details):
    - Title (string)
    - Price (string)
    - Image (image, optional)
    - Features array (strings)
    - Highlighted (boolean)
    - CTA button (CTA object)
  - Show header (boolean)
  - Sticky first column (boolean)
- **Use Cases:** Room types, package comparisons, membership tiers

#### **Timeline Block**
- **Purpose:** Chronological or step-by-step content
- **Fields:**
  - Items array:
    - Title (string)
    - Date or step number (string)
    - Content (portable text)
    - Image (image, optional)
  - Layout (vertical, horizontal)
  - Style (line, dotted, cards)
  - Alternate sides (boolean, for vertical)
- **Use Cases:** Itineraries, booking process, resort history

### 2.3 Social Proof & Engagement

#### **Testimonial Carousel Block**
- **Purpose:** Rotating customer reviews
- **Fields:**
  - Testimonials array:
    - Quote (text)
    - Author name (string)
    - Author location (string)
    - Author image (image, optional)
    - Rating (1-5 stars, optional)
  - Layout (single, multi-slide)
  - Autoplay (boolean)
  - Show navigation (boolean)
  - Show indicators (boolean)
- **Use Cases:** Social proof, customer stories, reviews

#### **Review Summary Block**
- **Purpose:** Aggregate review display
- **Fields:**
  - Overall rating (number, 1-5)
  - Total reviews (number)
  - Rating breakdown (5-star, 4-star, etc.)
  - Featured reviews (reference to testimonials)
  - CTA text & link (string, url)
- **Use Cases:** Resort pages, service pages, trust indicators

#### **Social Feed Block**
- **Purpose:** Embedded social media feeds
- **Fields:**
  - Platform (Instagram, Twitter, Facebook)
  - Feed URL or embed code (string)
  - Max posts to show (number)
  - Layout (grid, carousel, list)
  - Show captions (boolean)
- **Use Cases:** Instagram galleries, Twitter feeds, social engagement

### 2.4 Forms & Conversion

#### **Newsletter Signup Block**
- **Purpose:** Email capture form
- **Fields:**
  - Heading (string)
  - Description (text)
  - Style (inline, boxed, modal-trigger)
  - Background image (image, optional)
  - Success message (string)
  - Privacy text (string)
- **Use Cases:** Email list growth, content downloads, updates

#### **Contact Form Block**
- **Purpose:** Inquiry or booking form
- **Fields:**
  - Form title (string)
  - Fields array (predefined set to choose from):
    - Name, Email, Phone, Message, Date, Guests, etc.
  - Submit button text (string)
  - Success message (string)
  - Form action (email, API endpoint)
  - Required fields (array of strings)
- **Use Cases:** Contact pages, quote requests, booking inquiries

#### **Booking Widget Block**
- **Purpose:** Third-party booking integration
- **Fields:**
  - Widget type (TripAdvisor, Booking.com, custom)
  - Embed code or API config (text)
  - Property ID (string)
  - Default dates (date range, optional)
  - Style customization (object)
- **Use Cases:** Direct bookings, affiliate conversions

---

## Phase 3: Advanced Layout Components

### 3.1 Container Blocks

#### **Section Wrapper Block**
- **Purpose:** Container with styling options
- **Fields:**
  - Content (nested blocks array)
  - Background type (color, image, gradient)
  - Background value (varies by type)
  - Padding (small, medium, large, custom)
  - Max width (container, narrow, wide, full)
  - Anchor ID (string, for linking)
- **Use Cases:** Page sections, content grouping, visual hierarchy

#### **Columns Block**
- **Purpose:** Multi-column flexible layout
- **Fields:**
  - Columns array:
    - Column content (nested blocks)
    - Width percentage (auto or custom)
  - Gap size (small, medium, large)
  - Vertical alignment (top, center, bottom, stretch)
  - Responsive behavior (stack on mobile, maintain)
- **Use Cases:** Complex layouts, dashboards, landing pages

#### **Spacer Block**
- **Purpose:** Add vertical spacing
- **Fields:**
  - Height (small: 1rem, medium: 2rem, large: 4rem, xlarge: 6rem, custom)
  - Divider style (none, line, dashed, dots)
  - Divider width (full, contained)
- **Use Cases:** Visual separation, breathing room, section breaks

### 3.2 Promotional Blocks

#### **Banner Alert Block**
- **Purpose:** Important announcements or promotions
- **Fields:**
  - Message (string)
  - Type (info, warning, success, error, promotion)
  - Icon (boolean or custom)
  - Dismissible (boolean)
  - CTA button (CTA object, optional)
  - Position (inline, top-bar, floating)
- **Use Cases:** Special offers, important notices, seasonal promotions

#### **Pricing Card Block**
- **Purpose:** Single or multiple pricing options
- **Fields:**
  - Cards array:
    - Title (string)
    - Price (string)
    - Billing period (string)
    - Features list (array of strings)
    - Highlighted feature (boolean)
    - Badge text (string, optional)
    - CTA button (CTA object)
    - Highlighted (boolean)
  - Columns (1, 2, 3, 4)
  - Style (cards, bordered, minimal)
- **Use Cases:** Packages, memberships, special offers

#### **Countdown Timer Block**
- **Purpose:** Create urgency for limited offers
- **Fields:**
  - End date/time (datetime)
  - Title (string)
  - Description (text)
  - Style (inline, banner, boxed)
  - Show days/hours/minutes/seconds (booleans)
  - Expired message (string)
  - CTA button (CTA object, optional)
- **Use Cases:** Flash sales, event registration, limited offers

### 3.3 Content Discovery

#### **Related Content Block**
- **Purpose:** Link to similar content
- **Fields:**
  - Content references (array of page/destination/article refs)
  - Layout (grid, carousel, list)
  - Show images (boolean)
  - Show excerpts (boolean)
  - Columns (2, 3, 4)
  - Automatic (boolean - uses tags/categories)
- **Use Cases:** End of articles, cross-promotion, discovery

#### **Category Showcase Block**
- **Purpose:** Visual navigation to content categories
- **Fields:**
  - Categories (array of category references)
  - Display style (cards, hero tiles, simple links)
  - Show counts (boolean)
  - Layout (grid, carousel, list)
  - Columns (2, 3, 4, 5)
- **Use Cases:** Homepage, archive pages, navigation

#### **Search Block**
- **Purpose:** Content search interface
- **Fields:**
  - Placeholder text (string)
  - Search scope (all, destinations, articles, pages)
  - Style (minimal, boxed, hero)
  - Show filters (boolean)
  - Results display (modal, inline, redirect)
- **Use Cases:** Large sites, resource centers, discovery

---

## Phase 4: Specialty Travel Components

### 4.1 Travel-Specific Blocks

#### **Weather Widget Block**
- **Purpose:** Display destination weather
- **Fields:**
  - Location (string or coordinate)
  - Display type (current, 5-day, 10-day)
  - Units (metric, imperial)
  - Style (minimal, detailed, card)
  - Show icons (boolean)
- **Use Cases:** Destination pages, trip planning

#### **Map Block**
- **Purpose:** Interactive or static maps
- **Fields:**
  - Map type (Google Maps embed, static image, custom)
  - Location/coordinates (string)
  - Markers array (optional):
    - Name (string)
    - Coordinates (string)
    - Icon (image, optional)
  - Zoom level (number)
  - Height (number)
  - Show controls (boolean)
- **Use Cases:** Location pages, directions, area highlights

#### **Amenities List Block**
- **Purpose:** Resort/hotel features display
- **Fields:**
  - Amenities array:
    - Name (string)
    - Icon (image or icon picker)
    - Description (string, optional)
  - Layout (grid, list, columns)
  - Show icons (boolean)
  - Columns (2, 3, 4, 5, auto)
  - Category grouping (boolean)
- **Use Cases:** Resort pages, accommodation details

### 4.2 Booking & Conversion

#### **Package Card Block**
- **Purpose:** Travel package showcase
- **Fields:**
  - Package name (string)
  - Image (image)
  - Duration (string)
  - Price (string)
  - Highlights (array of strings)
  - Inclusions (array of strings)
  - CTA button (CTA object)
  - Badge (string, optional)
  - Featured (boolean)
- **Use Cases:** Package pages, offers, promotions

#### **Availability Calendar Block**
- **Purpose:** Show available dates
- **Fields:**
  - Calendar type (simple availability, pricing calendar)
  - Property/destination reference
  - Date range (start, end)
  - Show prices (boolean)
  - Highlight available dates (boolean)
  - Color scheme (object)
- **Use Cases:** Booking pages, seasonal planning

---

## Implementation Strategy

### Priority Order:
1. **Phase 1 (Weeks 1-2):** Essential content components - most immediate value
2. **Phase 2 (Weeks 3-4):** Interactive components - engagement & conversion
3. **Phase 3 (Weeks 5-6):** Advanced layouts - flexibility & sophistication  
4. **Phase 4 (Weeks 7-8):** Specialty components - travel-specific features

### Development Workflow:
1. **Schema Creation** (sanity/schemas/blocks/)
   - Define Sanity schema with proper types
   - Add preview configuration
   - Add helpful descriptions for editors
   - Include icons from react-icons

2. **Frontend Component** (src/components/blocks/)
   - Create React component with TypeScript
   - Implement responsive design with MUI
   - Add proper error handling
   - Optimize for performance

3. **BlockRenderer Integration** (src/components/blocks/BlockRenderer.tsx)
   - Add new case to switch statement
   - Map schema fields to component props
   - Handle edge cases and fallbacks

4. **Testing & Refinement**
   - Test in Sanity Studio interface
   - Preview in frontend
   - Test responsive behavior
   - Optimize performance
   - Document usage

### Quick Wins (Start Here):
- ✅ Quote Block - high visual impact, simple implementation
- ✅ Text & Image Block - most versatile, frequently used
- ✅ Card Grid Block - flexible, good for features/services
- ✅ Accordion Block - great for FAQs, reduces page length
- ✅ Image Gallery Block - essential for resorts/destinations

### Technical Considerations:

#### Reusable Patterns:
- Create shared type definitions (spacing, alignment, colors)
- Build common field groups (background options, CTA configs)
- Standardize preview configurations
- Create helper components (SectionWrapper, CardContainer)

#### Performance:
- Implement lazy loading for images
- Add intersection observers for animations
- Optimize block rendering with React.memo
- Consider virtual scrolling for long galleries/lists

#### Accessibility:
- Proper heading hierarchy
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly content

#### SEO:
- Proper semantic HTML
- Structured data where appropriate
- Alt text validation
- Heading structure validation

---

## Design System Integration

### Theme Tokens to Define:
- Spacing scale (xs, sm, md, lg, xl, 2xl)
- Border radius options (none, sm, md, lg, full)
- Shadow elevations (sm, md, lg, xl)
- Transition speeds (fast, normal, slow)
- Container max-widths (narrow, default, wide, full)

### Component Style Variants:
- **Surface styles:** default, outlined, elevated, flat
- **Size variants:** sm, md, lg, xl
- **Color schemes:** default, primary, accent, muted
- **Spacing presets:** compact, comfortable, spacious

---

## Content Editor Guidelines

### Block Usage Best Practices:
1. **Start with Hero Block** - establishes page context
2. **Use Text Blocks for main content** - scannable, accessible
3. **Break up text with Image/Media Blocks** - visual interest
4. **Add Card Grids for features** - organized, digestible
5. **Use CTAs strategically** - guide user journey
6. **End with Related Content** - keep users engaged

### Recommended Block Combinations:
- **Landing Page:** Hero → Stats → Text & Image → Card Grid → CTA → Testimonials
- **Destination:** Hero → Text → Image Gallery → Amenities → Map → Packages → CTA
- **Article:** Hero → Text (with inline images) → Quote → Text → Related Articles
- **Resort Page:** Hero → Text & Image → Accordion (FAQs) → Gallery → Reviews → Booking Widget

---

## Success Metrics

### Track After Implementation:
- Number of blocks created per content type
- Most used block types
- Editor feedback on usability
- Page load performance metrics
- Conversion rates by block type
- Engagement metrics (scroll depth, time on page)

### Quality Indicators:
- All blocks have proper TypeScript types
- 100% of blocks have mobile-responsive designs
- All images have alt text validation
- Lighthouse scores remain >90
- Zero console errors in production
- Editor satisfaction ratings >8/10

---

## Next Steps

1. **Review & Prioritize:** Discuss which components provide most value
2. **Create Shared Types:** Build reusable type definitions
3. **Start with Quick Wins:** Implement 3-5 high-value components
4. **Iterate Based on Feedback:** Refine based on editor usage
5. **Document as You Build:** Keep component documentation updated
6. **Test Continuously:** Ensure quality at each step

---

*This roadmap provides a comprehensive blueprint for building a world-class component library that empowers content editors while maintaining developer control over design and performance.*
