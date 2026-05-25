import {
  pgTable,
  uuid,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  primaryKey,
  index,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import type { ProductContent } from '@/lib/products/content';
import type { ReviewPhoto } from '@/lib/marketing/reviews';

// ---------- products ----------
export const products = pgTable('products', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  sku: text('sku').notNull().unique(),
  name: text('name').notNull(),
  pricePkr: integer('price_pkr').notNull(),
  listPricePkr: integer('list_price_pkr'),
  actives: text('actives'),
  imageUrl: text('image_url'),
  active: boolean('active').notNull().default(true),
  // Admin-panel additions (2026-05-25): merchandising copy + inventory.
  // stockQty is nullable — null means "untracked / made to order" so
  // existing rows keep working without a backfill.
  description: text('description'),
  stockQty: integer('stock_qty'),
  lowStockThreshold: integer('low_stock_threshold'),
  // Rich storefront/PDP content (tags, badges, benefits, ingredients,
  // directions, warnings). Editable from the admin; the PDP reads this.
  // Migrated 2026-05-25 out of the hardcoded lib/products/content.ts.
  content: jsonb('content').$type<ProductContent>(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

// ---------- bundles ----------
export const bundles = pgTable('bundles', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  concern: text('concern').notNull(),
  pricePkr: integer('price_pkr').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

// ---------- bundle_items ----------
export const bundleItems = pgTable(
  'bundle_items',
  {
    bundleId: uuid('bundle_id').notNull().references(() => bundles.id, { onDelete: 'cascade' }),
    productId: uuid('product_id').notNull().references(() => products.id),
    position: integer('position').notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.bundleId, t.productId] }),
  }),
);

// ---------- ai_sessions ----------
export const aiSessions = pgTable(
  'ai_sessions',
  {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    kind: text('kind').notNull(), // 'before_after' | 'skin_analysis'
    concern: text('concern'),
    inputImagePath: text('input_image_path').notNull(),
    inputImageSha256: text('input_image_sha256').notNull(),
    outputImagePath: text('output_image_path'),
    analysisJson: jsonb('analysis_json'),
    modelVersion: text('model_version').notNull(),
    latencyMs: integer('latency_ms'),
    consentGiven: boolean('consent_given').notNull(),
    clientIpHash: text('client_ip_hash').notNull(),
    clientUa: text('client_ua'),
    error: text('error'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    rateLimitIdx: index('ai_sessions_rate_limit_idx').on(t.clientIpHash, t.createdAt),
    kindIdx: index('ai_sessions_kind_idx').on(t.kind, t.createdAt),
  }),
);

// ---------- customers ----------
// Managed customer profiles. In a COD market the phone number is the
// real identity key (accounts are rare), so it is unique here. Orders
// carry their own denormalised name/phone/address snapshot AND link to
// a customer via orders.customer_id (nullable, SET NULL on delete) so a
// profile can be deleted without destroying order history.
export const customers = pgTable(
  'customers',
  {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    name: text('name').notNull(),
    phone: text('phone').notNull().unique(),
    email: text('email'),
    address: text('address'),
    city: text('city'),
    postal: text('postal'),
    notes: text('notes'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    emailIdx: index('customers_email_idx').on(t.email),
  }),
);

// ---------- reviews ----------
// Customer reviews with an approval workflow. status defaults to 'pending'
// so nothing publishes without admin approval; the storefront only renders
// 'approved'. Migrated 2026-05-25 out of the static lib/marketing/reviews.ts.
export const reviews = pgTable(
  'reviews',
  {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    customerId: uuid('customer_id').references(() => customers.id, { onDelete: 'set null' }),
    name: text('name').notNull(),
    location: text('location'),
    rating: integer('rating').notNull(), // 1–5
    protocol: text('protocol'),
    body: text('body').notNull(),
    verified: boolean('verified').notNull().default(false),
    photos: jsonb('photos').$type<ReviewPhoto[]>(),
    status: text('status').notNull().default('pending'), // pending | approved | disapproved
    source: text('source'), // seed | portal | admin
    reviewDate: timestamp('review_date', { withTimezone: true }).notNull().defaultNow(),
    clientIpHash: text('client_ip_hash'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    statusIdx: index('reviews_status_idx').on(t.status, t.reviewDate),
  }),
);

// ---------- orders ----------
export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  orderNumber: text('order_number').notNull().unique(),
  customerId: uuid('customer_id').references(() => customers.id, { onDelete: 'set null' }),
  status: text('status').notNull().default('pending'),
  concern: text('concern'),
  sourcePage: text('source_page').notNull(),
  customerName: text('customer_name').notNull(),
  customerPhone: text('customer_phone').notNull(),
  customerEmail: text('customer_email').notNull(),
  shippingAddress: text('shipping_address').notNull(),
  shippingCity: text('shipping_city').notNull(),
  shippingPostal: text('shipping_postal'),
  shippingNotes: text('shipping_notes'),
  paymentMethod: text('payment_method').notNull(),
  paymentStatus: text('payment_status').notNull().default('pending'),
  subtotalPkr: integer('subtotal_pkr').notNull(),
  shippingPkr: integer('shipping_pkr').notNull(),
  totalPkr: integer('total_pkr').notNull(),
  bundleInCart: boolean('bundle_in_cart').notNull(),
  usedAiPreview: boolean('used_ai_preview').notNull(),
  aiSessionId: uuid('ai_session_id').references(() => aiSessions.id),
  clientIpHash: text('client_ip_hash').notNull(),
  // Admin-panel additions (2026-05-25): fulfillment + ops notes.
  courier: text('courier'),
  trackingNumber: text('tracking_number'),
  internalNotes: text('internal_notes'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

// ---------- order_status_history ----------
// Append-only audit of every order status transition. Powers the
// timeline on the admin order-detail page and answers "who moved this
// to dispatched and when". Written by the admin status-change route.
export const orderStatusHistory = pgTable(
  'order_status_history',
  {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    orderId: uuid('order_id').notNull().references(() => orders.id, { onDelete: 'cascade' }),
    fromStatus: text('from_status'),
    toStatus: text('to_status').notNull(),
    note: text('note'),
    actorEmail: text('actor_email'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    orderIdx: index('order_status_history_order_idx').on(t.orderId, t.createdAt),
  }),
);

// ---------- order_items ----------
export const orderItems = pgTable('order_items', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  orderId: uuid('order_id').notNull().references(() => orders.id, { onDelete: 'cascade' }),
  sku: text('sku').notNull(),
  name: text('name').notNull(),
  qty: integer('qty').notNull(),
  unitPricePkr: integer('unit_price_pkr').notNull(),
  isBundle: boolean('is_bundle').notNull().default(false),
});

// ---------- subscribers ----------
// Newsletter opt-ins captured from the contact form (and, later, the
// site-wide footer subscribe stub). Unique on email so repeat submits
// dedupe via onConflictDoNothing. No PII beyond email + IP hash.
export const subscribers = pgTable('subscribers', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  email: text('email').notNull().unique(),
  sourcePage: text('source_page').notNull(),
  ipHash: text('ip_hash').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

// ---------- order_lookups ----------
// Every order-tracking attempt (regardless of outcome) so brute-force
// on order_number + phone last-4 can be rate-limited per IP.
export const orderLookups = pgTable(
  'order_lookups',
  {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    clientIpHash: text('client_ip_hash').notNull(),
    targetOrderNumber: text('target_order_number').notNull(),
    found: boolean('found').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    rateLimitIdx: index('order_lookups_rate_limit_idx').on(t.clientIpHash, t.createdAt),
  }),
);

// ---------- audit_log ----------
// Cross-cutting record of privileged admin actions (status changes,
// product edits, AI-session deletes, etc). Append-only; never updated.
// entityId is text (not uuid) so it can reference any entity kind.
export const auditLog = pgTable(
  'audit_log',
  {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    actorEmail: text('actor_email'),
    action: text('action').notNull(), // e.g. 'order.status_changed', 'product.updated'
    entityType: text('entity_type').notNull(), // 'order' | 'product' | 'ai_session' | ...
    entityId: text('entity_id'),
    meta: jsonb('meta'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    createdIdx: index('audit_log_created_idx').on(t.createdAt),
    entityIdx: index('audit_log_entity_idx').on(t.entityType, t.entityId),
  }),
);

// ---------- type exports ----------
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type Bundle = typeof bundles.$inferSelect;
export type NewBundle = typeof bundles.$inferInsert;
export type BundleItem = typeof bundleItems.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
export type OrderItem = typeof orderItems.$inferSelect;
export type NewOrderItem = typeof orderItems.$inferInsert;
export type AiSession = typeof aiSessions.$inferSelect;
export type NewAiSession = typeof aiSessions.$inferInsert;
export type Subscriber = typeof subscribers.$inferSelect;
export type NewSubscriber = typeof subscribers.$inferInsert;
export type OrderLookup = typeof orderLookups.$inferSelect;
export type NewOrderLookup = typeof orderLookups.$inferInsert;
export type OrderStatusHistory = typeof orderStatusHistory.$inferSelect;
export type NewOrderStatusHistory = typeof orderStatusHistory.$inferInsert;
export type AuditLog = typeof auditLog.$inferSelect;
export type NewAuditLog = typeof auditLog.$inferInsert;
export type Customer = typeof customers.$inferSelect;
export type NewCustomer = typeof customers.$inferInsert;
export type ReviewRow = typeof reviews.$inferSelect;
export type NewReviewRow = typeof reviews.$inferInsert;
