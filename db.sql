--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.6
-- Dumped by pg_dump version 10.0

-- Started on 2018-02-18 21:51:45 CET

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET search_path = tasks, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 189 (class 1259 OID 16405)
-- Name: tasks; Type: TABLE; Schema: tasks; Owner: -
--

CREATE TABLE tasks (
    title text NOT NULL,
    done boolean NOT NULL,
    key integer NOT NULL
);


--
-- TOC entry 190 (class 1259 OID 16413)
-- Name: tasks_key_seq; Type: SEQUENCE; Schema: tasks; Owner: -
--

CREATE SEQUENCE tasks_key_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2400 (class 0 OID 0)
-- Dependencies: 190
-- Name: tasks_key_seq; Type: SEQUENCE OWNED BY; Schema: tasks; Owner: -
--

ALTER SEQUENCE tasks_key_seq OWNED BY tasks.key;


--
-- TOC entry 2276 (class 2604 OID 16415)
-- Name: tasks key; Type: DEFAULT; Schema: tasks; Owner: -
--

ALTER TABLE ONLY tasks ALTER COLUMN key SET DEFAULT nextval('tasks_key_seq'::regclass);


--
-- TOC entry 2278 (class 2606 OID 16417)
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: tasks; Owner: -
--

ALTER TABLE ONLY tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (key);


-- Completed on 2018-02-18 21:51:45 CET

--
-- PostgreSQL database dump complete
--

