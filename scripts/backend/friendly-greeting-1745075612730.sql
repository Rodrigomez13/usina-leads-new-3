--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3 (PGlite 0.2.0)
-- Dumped by pg_dump version 16.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'SQL_ASCII';
SET standard_conforming_strings = off;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET escape_string_warning = off;
SET row_security = off;

--
-- Name: meta; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA meta;


ALTER SCHEMA meta OWNER TO postgres;

--
-- Name: vector; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA public;


--
-- Name: EXTENSION vector; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION vector IS 'vector data type and ivfflat and hnsw access methods';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: embeddings; Type: TABLE; Schema: meta; Owner: postgres
--

CREATE TABLE meta.embeddings (
    id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    content text NOT NULL,
    embedding public.vector(384) NOT NULL
);


ALTER TABLE meta.embeddings OWNER TO postgres;

--
-- Name: embeddings_id_seq; Type: SEQUENCE; Schema: meta; Owner: postgres
--

ALTER TABLE meta.embeddings ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME meta.embeddings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: migrations; Type: TABLE; Schema: meta; Owner: postgres
--

CREATE TABLE meta.migrations (
    version text NOT NULL,
    name text,
    applied_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE meta.migrations OWNER TO postgres;

--
-- Name: ad_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ad_groups (
    id bigint NOT NULL,
    name text NOT NULL,
    campaign_id bigint
);


ALTER TABLE public.ad_groups OWNER TO postgres;

--
-- Name: ad_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.ad_groups ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.ad_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: ads; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ads (
    id bigint NOT NULL,
    name text NOT NULL,
    ad_group_id bigint,
    status text NOT NULL,
    cost_per_click numeric NOT NULL,
    media_url text
);


ALTER TABLE public.ads OWNER TO postgres;

--
-- Name: ads_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.ads ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.ads_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: agencies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.agencies (
    id bigint NOT NULL,
    name text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    is_active boolean NOT NULL
);


ALTER TABLE public.agencies OWNER TO postgres;

--
-- Name: agencies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.agencies ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.agencies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: agency_assignments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.agency_assignments (
    id bigint NOT NULL,
    lead_id bigint,
    agency_id bigint,
    assigned_at timestamp with time zone DEFAULT now(),
    status text NOT NULL
);


ALTER TABLE public.agency_assignments OWNER TO postgres;

--
-- Name: agency_assignments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.agency_assignments ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.agency_assignments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: agency_deposits; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.agency_deposits (
    id bigint NOT NULL,
    agency_id bigint,
    amount numeric NOT NULL,
    deposited_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.agency_deposits OWNER TO postgres;

--
-- Name: agency_deposits_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.agency_deposits ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.agency_deposits_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: business_managers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.business_managers (
    id bigint NOT NULL,
    name text NOT NULL,
    portfolio_id bigint,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.business_managers OWNER TO postgres;

--
-- Name: business_managers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.business_managers ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.business_managers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: campaigns; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.campaigns (
    id bigint NOT NULL,
    name text NOT NULL,
    business_manager_id bigint,
    start_date date NOT NULL,
    end_date date
);


ALTER TABLE public.campaigns OWNER TO postgres;

--
-- Name: campaigns_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.campaigns ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.campaigns_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: employees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employees (
    id bigint NOT NULL,
    name text NOT NULL,
    dni text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    hourly_rate numeric NOT NULL,
    shift_id bigint,
    is_active boolean NOT NULL
);


ALTER TABLE public.employees OWNER TO postgres;

--
-- Name: employees_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.employees ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.employees_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: expenses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.expenses (
    id bigint NOT NULL,
    description text NOT NULL,
    amount numeric NOT NULL,
    date date NOT NULL,
    type text NOT NULL,
    payroll_id bigint
);


ALTER TABLE public.expenses OWNER TO postgres;

--
-- Name: expenses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.expenses ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.expenses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: leads; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.leads (
    id bigint NOT NULL,
    server_ad_id bigint,
    received_at timestamp with time zone DEFAULT now(),
    converted boolean NOT NULL,
    agency_id bigint
);


ALTER TABLE public.leads OWNER TO postgres;

--
-- Name: leads_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.leads ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.leads_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: payroll_agency_split; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payroll_agency_split (
    id bigint NOT NULL,
    payroll_id bigint,
    agency_id bigint,
    percentage numeric NOT NULL,
    amount numeric NOT NULL
);


ALTER TABLE public.payroll_agency_split OWNER TO postgres;

--
-- Name: payroll_agency_split_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.payroll_agency_split ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.payroll_agency_split_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: payrolls; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payrolls (
    id bigint NOT NULL,
    month integer NOT NULL,
    year integer NOT NULL,
    total_salaries numeric NOT NULL,
    total_admin_expenses numeric NOT NULL
);


ALTER TABLE public.payrolls OWNER TO postgres;

--
-- Name: payrolls_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.payrolls ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.payrolls_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: portfolios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.portfolios (
    id bigint NOT NULL,
    name text NOT NULL,
    wallet_id bigint,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.portfolios OWNER TO postgres;

--
-- Name: portfolios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.portfolios ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.portfolios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: server_ads; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.server_ads (
    id bigint NOT NULL,
    server_id bigint,
    ad_id bigint,
    date date NOT NULL,
    leads integer NOT NULL,
    loads integer NOT NULL,
    spent numeric NOT NULL
);


ALTER TABLE public.server_ads OWNER TO postgres;

--
-- Name: server_ads_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.server_ads ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.server_ads_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: servers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.servers (
    id bigint NOT NULL,
    name text NOT NULL,
    coefficient numeric NOT NULL,
    whatsapp_line text,
    start_time timestamp with time zone,
    end_time timestamp with time zone
);


ALTER TABLE public.servers OWNER TO postgres;

--
-- Name: servers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.servers ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.servers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: shifts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shifts (
    id bigint NOT NULL,
    name text NOT NULL,
    start_hour time without time zone NOT NULL,
    end_hour time without time zone NOT NULL
);


ALTER TABLE public.shifts OWNER TO postgres;

--
-- Name: shifts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.shifts ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.shifts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: wallets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.wallets (
    id bigint NOT NULL,
    name text NOT NULL,
    balance numeric NOT NULL
);


ALTER TABLE public.wallets OWNER TO postgres;

--
-- Name: wallets_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.wallets ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.wallets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: work_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.work_logs (
    id bigint NOT NULL,
    employee_id bigint,
    date date NOT NULL,
    hours_worked numeric NOT NULL,
    is_day_off boolean NOT NULL
);


ALTER TABLE public.work_logs OWNER TO postgres;

--
-- Name: work_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.work_logs ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.work_logs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: embeddings; Type: TABLE DATA; Schema: meta; Owner: postgres
--



--
-- Data for Name: migrations; Type: TABLE DATA; Schema: meta; Owner: postgres
--

INSERT INTO meta.migrations VALUES ('202407160001', 'embeddings', '2025-04-18 17:50:59.827+00');


--
-- Data for Name: ad_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: ads; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: agencies; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: agency_assignments; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: agency_deposits; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: business_managers; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: campaigns; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: expenses; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: leads; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: payroll_agency_split; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: payrolls; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: portfolios; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: server_ads; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: servers; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: shifts; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: wallets; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: work_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Name: embeddings_id_seq; Type: SEQUENCE SET; Schema: meta; Owner: postgres
--

SELECT pg_catalog.setval('meta.embeddings_id_seq', 1, false);


--
-- Name: ad_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ad_groups_id_seq', 1, false);


--
-- Name: ads_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ads_id_seq', 1, false);


--
-- Name: agencies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.agencies_id_seq', 1, false);


--
-- Name: agency_assignments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.agency_assignments_id_seq', 1, false);


--
-- Name: agency_deposits_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.agency_deposits_id_seq', 1, false);


--
-- Name: business_managers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.business_managers_id_seq', 1, false);


--
-- Name: campaigns_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaigns_id_seq', 1, false);


--
-- Name: employees_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employees_id_seq', 1, false);


--
-- Name: expenses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.expenses_id_seq', 1, false);


--
-- Name: leads_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.leads_id_seq', 1, false);


--
-- Name: payroll_agency_split_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payroll_agency_split_id_seq', 1, false);


--
-- Name: payrolls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payrolls_id_seq', 1, false);


--
-- Name: portfolios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.portfolios_id_seq', 1, false);


--
-- Name: server_ads_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.server_ads_id_seq', 1, false);


--
-- Name: servers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.servers_id_seq', 1, false);


--
-- Name: shifts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.shifts_id_seq', 1, false);


--
-- Name: wallets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.wallets_id_seq', 1, false);


--
-- Name: work_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.work_logs_id_seq', 1, false);


--
-- Name: embeddings embeddings_pkey; Type: CONSTRAINT; Schema: meta; Owner: postgres
--

ALTER TABLE ONLY meta.embeddings
    ADD CONSTRAINT embeddings_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: meta; Owner: postgres
--

ALTER TABLE ONLY meta.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (version);


--
-- Name: ad_groups ad_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ad_groups
    ADD CONSTRAINT ad_groups_pkey PRIMARY KEY (id);


--
-- Name: ads ads_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ads
    ADD CONSTRAINT ads_pkey PRIMARY KEY (id);


--
-- Name: agencies agencies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencies
    ADD CONSTRAINT agencies_pkey PRIMARY KEY (id);


--
-- Name: agency_assignments agency_assignments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agency_assignments
    ADD CONSTRAINT agency_assignments_pkey PRIMARY KEY (id);


--
-- Name: agency_deposits agency_deposits_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agency_deposits
    ADD CONSTRAINT agency_deposits_pkey PRIMARY KEY (id);


--
-- Name: business_managers business_managers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.business_managers
    ADD CONSTRAINT business_managers_pkey PRIMARY KEY (id);


--
-- Name: campaigns campaigns_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns
    ADD CONSTRAINT campaigns_pkey PRIMARY KEY (id);


--
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (id);


--
-- Name: expenses expenses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT expenses_pkey PRIMARY KEY (id);


--
-- Name: leads leads_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leads
    ADD CONSTRAINT leads_pkey PRIMARY KEY (id);


--
-- Name: payroll_agency_split payroll_agency_split_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payroll_agency_split
    ADD CONSTRAINT payroll_agency_split_pkey PRIMARY KEY (id);


--
-- Name: payrolls payrolls_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payrolls
    ADD CONSTRAINT payrolls_pkey PRIMARY KEY (id);


--
-- Name: portfolios portfolios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.portfolios
    ADD CONSTRAINT portfolios_pkey PRIMARY KEY (id);


--
-- Name: server_ads server_ads_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.server_ads
    ADD CONSTRAINT server_ads_pkey PRIMARY KEY (id);


--
-- Name: servers servers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servers
    ADD CONSTRAINT servers_pkey PRIMARY KEY (id);


--
-- Name: shifts shifts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shifts
    ADD CONSTRAINT shifts_pkey PRIMARY KEY (id);


--
-- Name: wallets wallets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wallets
    ADD CONSTRAINT wallets_pkey PRIMARY KEY (id);


--
-- Name: work_logs work_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.work_logs
    ADD CONSTRAINT work_logs_pkey PRIMARY KEY (id);


--
-- Name: ad_groups ad_groups_campaign_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ad_groups
    ADD CONSTRAINT ad_groups_campaign_id_fkey FOREIGN KEY (campaign_id) REFERENCES public.campaigns(id);


--
-- Name: ads ads_ad_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ads
    ADD CONSTRAINT ads_ad_group_id_fkey FOREIGN KEY (ad_group_id) REFERENCES public.ad_groups(id);


--
-- Name: agency_assignments agency_assignments_agency_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agency_assignments
    ADD CONSTRAINT agency_assignments_agency_id_fkey FOREIGN KEY (agency_id) REFERENCES public.agencies(id);


--
-- Name: agency_assignments agency_assignments_lead_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agency_assignments
    ADD CONSTRAINT agency_assignments_lead_id_fkey FOREIGN KEY (lead_id) REFERENCES public.leads(id);


--
-- Name: agency_deposits agency_deposits_agency_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agency_deposits
    ADD CONSTRAINT agency_deposits_agency_id_fkey FOREIGN KEY (agency_id) REFERENCES public.agencies(id);


--
-- Name: business_managers business_managers_portfolio_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.business_managers
    ADD CONSTRAINT business_managers_portfolio_id_fkey FOREIGN KEY (portfolio_id) REFERENCES public.portfolios(id);


--
-- Name: campaigns campaigns_business_manager_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns
    ADD CONSTRAINT campaigns_business_manager_id_fkey FOREIGN KEY (business_manager_id) REFERENCES public.business_managers(id);


--
-- Name: employees employees_shift_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_shift_id_fkey FOREIGN KEY (shift_id) REFERENCES public.shifts(id);


--
-- Name: expenses expenses_payroll_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT expenses_payroll_id_fkey FOREIGN KEY (payroll_id) REFERENCES public.payrolls(id);


--
-- Name: leads leads_agency_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leads
    ADD CONSTRAINT leads_agency_id_fkey FOREIGN KEY (agency_id) REFERENCES public.agencies(id);


--
-- Name: leads leads_server_ad_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leads
    ADD CONSTRAINT leads_server_ad_id_fkey FOREIGN KEY (server_ad_id) REFERENCES public.server_ads(id);


--
-- Name: payroll_agency_split payroll_agency_split_agency_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payroll_agency_split
    ADD CONSTRAINT payroll_agency_split_agency_id_fkey FOREIGN KEY (agency_id) REFERENCES public.agencies(id);


--
-- Name: payroll_agency_split payroll_agency_split_payroll_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payroll_agency_split
    ADD CONSTRAINT payroll_agency_split_payroll_id_fkey FOREIGN KEY (payroll_id) REFERENCES public.payrolls(id);


--
-- Name: portfolios portfolios_wallet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.portfolios
    ADD CONSTRAINT portfolios_wallet_id_fkey FOREIGN KEY (wallet_id) REFERENCES public.wallets(id);


--
-- Name: server_ads server_ads_ad_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.server_ads
    ADD CONSTRAINT server_ads_ad_id_fkey FOREIGN KEY (ad_id) REFERENCES public.ads(id);


--
-- Name: server_ads server_ads_server_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.server_ads
    ADD CONSTRAINT server_ads_server_id_fkey FOREIGN KEY (server_id) REFERENCES public.servers(id);


--
-- Name: work_logs work_logs_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.work_logs
    ADD CONSTRAINT work_logs_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.employees(id);


--
-- PostgreSQL database dump complete
--

