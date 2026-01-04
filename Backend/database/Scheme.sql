-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.ShopItems (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  description character varying,
  title character varying,
  num_reviews bigint,
  stars real,
  reviews character varying,
  category character varying,
  price double precision,
  Image_path character varying,
  CONSTRAINT ShopItems_pkey PRIMARY KEY (id)
);
CREATE TABLE public.users (
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  role character varying,
  display_name character varying,
  email character varying,
  id uuid NOT NULL,
  trial_end_date timestamp with time zone,
  subscription_status text DEFAULT 'trial'::text CHECK (subscription_status = ANY (ARRAY['trial'::text, 'active'::text, 'expired'::text]))
);
CREATE TABLE public.youtube_channels (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  channel_id text NOT NULL,
  channel_name text NOT NULL,
  verification_code text NOT NULL,
  is_verified boolean DEFAULT false,
  added_at timestamp with time zone DEFAULT now(),
  last_checked timestamp with time zone,
  is_active boolean DEFAULT true,
  CONSTRAINT youtube_channels_pkey PRIMARY KEY (id),
  CONSTRAINT youtube_channels_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.youtube_uploads (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  channel_id text NOT NULL,
  channel_name text NOT NULL,
  video_id text NOT NULL UNIQUE,
  video_title text NOT NULL,
  uploaded_at timestamp with time zone NOT NULL,
  detected_at timestamp with time zone DEFAULT now(),
  CONSTRAINT youtube_uploads_pkey PRIMARY KEY (id)
);