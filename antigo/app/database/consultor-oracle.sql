CREATE TABLE agendamento( 
      contrato_id number(10)   , 
      id number(10)    NOT NULL , 
      profissional_id number(10)   , 
      descricao varchar(3000)    NOT NULL , 
      horario_inicial timestamp(0)    NOT NULL , 
      intervalo_inicial timestamp(0)   , 
      intervalo_final timestamp(0)   , 
      horario_final timestamp(0)    NOT NULL , 
      cor varchar(3000)   , 
      observacao varchar(3000)   , 
      tipo varchar  (1)   , 
      data_agenda date   , 
      hora_inicio time   , 
      hora_fim time   , 
      hora_intervalo_inicial time   , 
      hora_intervalo_final time   , 
      hora_total time   , 
      local char  (1)   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE ausencias( 
      id number(10)    NOT NULL , 
      profissional_id number(10)    NOT NULL , 
      descricao varchar(3000)   , 
      inicio timestamp(0)   , 
      final timestamp(0)   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE cidade( 
      id number(10)    NOT NULL , 
      estado_id number(10)    NOT NULL , 
      nome varchar(3000)    NOT NULL , 
 PRIMARY KEY (id)) ; 

CREATE TABLE colaborador( 
      id number(10)    NOT NULL , 
      nome varchar(3000)    NOT NULL , 
      telefone varchar  (9)   , 
      whatsapp char  (1)   , 
      email varchar(3000)   , 
      funcao_id number(10)    NOT NULL , 
 PRIMARY KEY (id)) ; 

CREATE TABLE contrato( 
      id number(10)    NOT NULL , 
      empresa_id number(10)    NOT NULL , 
      descricao varchar(3000)    NOT NULL , 
      dt_inicio date    NOT NULL , 
      dt_fim date    NOT NULL , 
      valor_hora binary_double   , 
      cor varchar(3000)   , 
      valor_fixo binary_double   , 
      tipo varchar  (1)    NOT NULL , 
 PRIMARY KEY (id)) ; 

CREATE TABLE contrato_item( 
      id number(10)    NOT NULL , 
      contrato_id number(10)    NOT NULL , 
      dia_semana number(10)   , 
      hora_inicio time   , 
      intervalo_ini time   , 
      intervalo_fim time   , 
      hora_final time   , 
      profissional_id number(10)   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE contrato_profissional( 
      id number(10)    NOT NULL , 
      contrato_id number(10)    NOT NULL , 
      profissional_id number(10)    NOT NULL , 
 PRIMARY KEY (id)) ; 

CREATE TABLE empresa( 
      id number(10)    NOT NULL , 
      nome varchar(3000)    NOT NULL , 
      razao varchar(3000)   , 
      responsalvel varchar(3000)   , 
      cidade_id number(10)    NOT NULL , 
      endereco varchar(3000)   , 
      cor varchar(3000)   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE empresa_colaborador( 
      id number(10)    NOT NULL , 
      empresa_id number(10)    NOT NULL , 
      colaborador_id number(10)    NOT NULL , 
 PRIMARY KEY (id)) ; 

CREATE TABLE estado( 
      id number(10)    NOT NULL , 
      nome varchar(3000)    NOT NULL , 
 PRIMARY KEY (id)) ; 

CREATE TABLE feriado( 
      id number(10)    NOT NULL , 
      dt_feriado date   , 
      tipo char  (1)   , 
      descricao char  (30)   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE funcao( 
      id number(10)    NOT NULL , 
      descricao varchar(3000)    NOT NULL , 
 PRIMARY KEY (id)) ; 

CREATE TABLE profissional( 
      id number(10)    NOT NULL , 
      nome varchar(3000)    NOT NULL , 
      system_user_id number(10)    NOT NULL , 
 PRIMARY KEY (id)) ; 

CREATE TABLE realizado( 
      id number(10)    NOT NULL , 
      contrato_id number(10)    NOT NULL , 
      profissional_id number(10)    NOT NULL , 
      descricao varchar(3000)    NOT NULL , 
      inicio timestamp(0)    NOT NULL , 
      inter_inicial timestamp(0)   , 
      inter_final timestamp(0)   , 
      fim timestamp(0)    NOT NULL , 
      observacao varchar(3000)   , 
      horas binary_double   , 
      agendamento_id number(10)   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_document( 
      id number(10)    NOT NULL , 
      category_id number(10)    NOT NULL , 
      system_user_id number(10)   , 
      title varchar(3000)    NOT NULL , 
      description varchar(3000)   , 
      submission_date date   , 
      archive_date date   , 
      filename varchar(3000)   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_document_category( 
      id number(10)    NOT NULL , 
      name varchar(3000)    NOT NULL , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_document_group( 
      id number(10)    NOT NULL , 
      document_id number(10)    NOT NULL , 
      system_group_id number(10)    NOT NULL , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_document_user( 
      id number(10)    NOT NULL , 
      document_id number(10)    NOT NULL , 
      system_user_id number(10)    NOT NULL , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_group( 
      id number(10)    NOT NULL , 
      name varchar(3000)    NOT NULL , 
      uuid varchar  (36)   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_group_program( 
      id number(10)    NOT NULL , 
      system_group_id number(10)    NOT NULL , 
      system_program_id number(10)    NOT NULL , 
      actions varchar(3000)   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_message( 
      id number(10)    NOT NULL , 
      system_user_id number(10)    NOT NULL , 
      system_user_to_id number(10)    NOT NULL , 
      subject varchar(3000)    NOT NULL , 
      message varchar(3000)   , 
      dt_message timestamp(0)   , 
      checked char  (1)   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_notification( 
      id number(10)    NOT NULL , 
      system_user_id number(10)    NOT NULL , 
      system_user_to_id number(10)    NOT NULL , 
      subject varchar(3000)   , 
      message varchar(3000)   , 
      dt_message timestamp(0)   , 
      action_url varchar(3000)   , 
      action_label varchar(3000)   , 
      icon varchar(3000)   , 
      checked char  (1)   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_preference( 
      id varchar  (255)    NOT NULL , 
      preference varchar(3000)   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_program( 
      id number(10)    NOT NULL , 
      name varchar(3000)    NOT NULL , 
      controller varchar(3000)    NOT NULL , 
      actions varchar(3000)   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_unit( 
      id number(10)    NOT NULL , 
      name varchar(3000)    NOT NULL , 
      connection_name varchar(3000)   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_user_group( 
      id number(10)    NOT NULL , 
      system_user_id number(10)    NOT NULL , 
      system_group_id number(10)    NOT NULL , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_user_program( 
      id number(10)    NOT NULL , 
      system_user_id number(10)    NOT NULL , 
      system_program_id number(10)    NOT NULL , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_users( 
      id number(10)    NOT NULL , 
      name varchar(3000)    NOT NULL , 
      login varchar(3000)    NOT NULL , 
      password varchar(3000)    NOT NULL , 
      email varchar(3000)   , 
      frontpage_id number(10)   , 
      system_unit_id number(10)   , 
      active char  (1)   , 
      accepted_term_policy_at varchar(3000)   , 
      accepted_term_policy char  (1)   , 
      two_factor_enabled char  (1)    DEFAULT 'N' , 
      two_factor_type varchar  (100)   , 
      two_factor_secret varchar  (255)   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_user_unit( 
      id number(10)    NOT NULL , 
      system_user_id number(10)    NOT NULL , 
      system_unit_id number(10)    NOT NULL , 
 PRIMARY KEY (id)) ; 

 
 ALTER TABLE profissional ADD UNIQUE (system_user_id);
  
 ALTER TABLE agendamento ADD CONSTRAINT fk_agendamento_1 FOREIGN KEY (contrato_id) references contrato(id); 
ALTER TABLE agendamento ADD CONSTRAINT fk_agendamento_2 FOREIGN KEY (profissional_id) references profissional(id); 
ALTER TABLE ausencias ADD CONSTRAINT fk_ausencias_1 FOREIGN KEY (profissional_id) references profissional(id); 
ALTER TABLE cidade ADD CONSTRAINT fk_cidade_1 FOREIGN KEY (estado_id) references estado(id); 
ALTER TABLE colaborador ADD CONSTRAINT fk_colaborador_2 FOREIGN KEY (funcao_id) references funcao(id); 
ALTER TABLE contrato ADD CONSTRAINT fk_contrato_1 FOREIGN KEY (empresa_id) references empresa(id); 
ALTER TABLE contrato_item ADD CONSTRAINT fk_item_contrato_1 FOREIGN KEY (contrato_id) references contrato(id); 
ALTER TABLE contrato_item ADD CONSTRAINT fk_item_contrato_2 FOREIGN KEY (profissional_id) references profissional(id); 
ALTER TABLE contrato_profissional ADD CONSTRAINT fk_contrato_profissional_1 FOREIGN KEY (contrato_id) references contrato(id); 
ALTER TABLE contrato_profissional ADD CONSTRAINT fk_contrato_profissional_2 FOREIGN KEY (profissional_id) references profissional(id); 
ALTER TABLE empresa ADD CONSTRAINT fk_empresa_1 FOREIGN KEY (cidade_id) references cidade(id); 
ALTER TABLE empresa_colaborador ADD CONSTRAINT fk_empresa_colaborador_1 FOREIGN KEY (colaborador_id) references colaborador(id); 
ALTER TABLE empresa_colaborador ADD CONSTRAINT fk_empresa_colaborador_2 FOREIGN KEY (empresa_id) references empresa(id); 
ALTER TABLE realizado ADD CONSTRAINT fk_realizado_1 FOREIGN KEY (contrato_id) references contrato(id); 
ALTER TABLE realizado ADD CONSTRAINT fk_realizado_2 FOREIGN KEY (profissional_id) references profissional(id); 
ALTER TABLE system_document ADD CONSTRAINT fk_system_document_2 FOREIGN KEY (category_id) references system_document_category(id); 
ALTER TABLE system_document ADD CONSTRAINT fk_system_document_1 FOREIGN KEY (system_user_id) references system_users(id); 
ALTER TABLE system_document_group ADD CONSTRAINT fk_system_document_group_2 FOREIGN KEY (document_id) references system_document(id); 
ALTER TABLE system_document_group ADD CONSTRAINT fk_system_document_group_1 FOREIGN KEY (system_group_id) references system_group(id); 
ALTER TABLE system_document_user ADD CONSTRAINT fk_system_document_user_2 FOREIGN KEY (document_id) references system_document(id); 
ALTER TABLE system_document_user ADD CONSTRAINT fk_system_document_user_1 FOREIGN KEY (system_user_id) references system_users(id); 
ALTER TABLE system_group_program ADD CONSTRAINT fk_system_group_program_1 FOREIGN KEY (system_program_id) references system_program(id); 
ALTER TABLE system_group_program ADD CONSTRAINT fk_system_group_program_2 FOREIGN KEY (system_group_id) references system_group(id); 
ALTER TABLE system_message ADD CONSTRAINT fk_system_message_1 FOREIGN KEY (system_user_id) references system_users(id); 
ALTER TABLE system_message ADD CONSTRAINT fk_system_message_2 FOREIGN KEY (system_user_to_id) references system_users(id); 
ALTER TABLE system_notification ADD CONSTRAINT fk_system_notification_1 FOREIGN KEY (system_user_id) references system_users(id); 
ALTER TABLE system_notification ADD CONSTRAINT fk_system_notification_2 FOREIGN KEY (system_user_to_id) references system_users(id); 
ALTER TABLE system_user_group ADD CONSTRAINT fk_system_user_group_1 FOREIGN KEY (system_group_id) references system_group(id); 
ALTER TABLE system_user_group ADD CONSTRAINT fk_system_user_group_2 FOREIGN KEY (system_user_id) references system_users(id); 
ALTER TABLE system_user_program ADD CONSTRAINT fk_system_user_program_1 FOREIGN KEY (system_program_id) references system_program(id); 
ALTER TABLE system_user_program ADD CONSTRAINT fk_system_user_program_2 FOREIGN KEY (system_user_id) references system_users(id); 
ALTER TABLE system_users ADD CONSTRAINT fk_system_user_1 FOREIGN KEY (system_unit_id) references system_unit(id); 
ALTER TABLE system_users ADD CONSTRAINT fk_system_user_2 FOREIGN KEY (frontpage_id) references system_program(id); 
ALTER TABLE system_user_unit ADD CONSTRAINT fk_system_user_unit_1 FOREIGN KEY (system_user_id) references system_users(id); 
ALTER TABLE system_user_unit ADD CONSTRAINT fk_system_user_unit_2 FOREIGN KEY (system_unit_id) references system_unit(id); 
 CREATE SEQUENCE agendamento_id_seq START WITH 1 INCREMENT BY 1; 

CREATE OR REPLACE TRIGGER agendamento_id_seq_tr 

BEFORE INSERT ON agendamento FOR EACH ROW 

    WHEN 

        (NEW.id IS NULL) 

    BEGIN 

        SELECT agendamento_id_seq.NEXTVAL INTO :NEW.id FROM DUAL; 

END;
CREATE SEQUENCE ausencias_id_seq START WITH 1 INCREMENT BY 1; 

CREATE OR REPLACE TRIGGER ausencias_id_seq_tr 

BEFORE INSERT ON ausencias FOR EACH ROW 

    WHEN 

        (NEW.id IS NULL) 

    BEGIN 

        SELECT ausencias_id_seq.NEXTVAL INTO :NEW.id FROM DUAL; 

END;
CREATE SEQUENCE cidade_id_seq START WITH 1 INCREMENT BY 1; 

CREATE OR REPLACE TRIGGER cidade_id_seq_tr 

BEFORE INSERT ON cidade FOR EACH ROW 

    WHEN 

        (NEW.id IS NULL) 

    BEGIN 

        SELECT cidade_id_seq.NEXTVAL INTO :NEW.id FROM DUAL; 

END;
CREATE SEQUENCE colaborador_id_seq START WITH 1 INCREMENT BY 1; 

CREATE OR REPLACE TRIGGER colaborador_id_seq_tr 

BEFORE INSERT ON colaborador FOR EACH ROW 

    WHEN 

        (NEW.id IS NULL) 

    BEGIN 

        SELECT colaborador_id_seq.NEXTVAL INTO :NEW.id FROM DUAL; 

END;
CREATE SEQUENCE contrato_id_seq START WITH 1 INCREMENT BY 1; 

CREATE OR REPLACE TRIGGER contrato_id_seq_tr 

BEFORE INSERT ON contrato FOR EACH ROW 

    WHEN 

        (NEW.id IS NULL) 

    BEGIN 

        SELECT contrato_id_seq.NEXTVAL INTO :NEW.id FROM DUAL; 

END;
CREATE SEQUENCE contrato_item_id_seq START WITH 1 INCREMENT BY 1; 

CREATE OR REPLACE TRIGGER contrato_item_id_seq_tr 

BEFORE INSERT ON contrato_item FOR EACH ROW 

    WHEN 

        (NEW.id IS NULL) 

    BEGIN 

        SELECT contrato_item_id_seq.NEXTVAL INTO :NEW.id FROM DUAL; 

END;
CREATE SEQUENCE contrato_profissional_id_seq START WITH 1 INCREMENT BY 1; 

CREATE OR REPLACE TRIGGER contrato_profissional_id_seq_tr 

BEFORE INSERT ON contrato_profissional FOR EACH ROW 

    WHEN 

        (NEW.id IS NULL) 

    BEGIN 

        SELECT contrato_profissional_id_seq.NEXTVAL INTO :NEW.id FROM DUAL; 

END;
CREATE SEQUENCE empresa_id_seq START WITH 1 INCREMENT BY 1; 

CREATE OR REPLACE TRIGGER empresa_id_seq_tr 

BEFORE INSERT ON empresa FOR EACH ROW 

    WHEN 

        (NEW.id IS NULL) 

    BEGIN 

        SELECT empresa_id_seq.NEXTVAL INTO :NEW.id FROM DUAL; 

END;
CREATE SEQUENCE empresa_colaborador_id_seq START WITH 1 INCREMENT BY 1; 

CREATE OR REPLACE TRIGGER empresa_colaborador_id_seq_tr 

BEFORE INSERT ON empresa_colaborador FOR EACH ROW 

    WHEN 

        (NEW.id IS NULL) 

    BEGIN 

        SELECT empresa_colaborador_id_seq.NEXTVAL INTO :NEW.id FROM DUAL; 

END;
CREATE SEQUENCE estado_id_seq START WITH 1 INCREMENT BY 1; 

CREATE OR REPLACE TRIGGER estado_id_seq_tr 

BEFORE INSERT ON estado FOR EACH ROW 

    WHEN 

        (NEW.id IS NULL) 

    BEGIN 

        SELECT estado_id_seq.NEXTVAL INTO :NEW.id FROM DUAL; 

END;
CREATE SEQUENCE feriado_id_seq START WITH 1 INCREMENT BY 1; 

CREATE OR REPLACE TRIGGER feriado_id_seq_tr 

BEFORE INSERT ON feriado FOR EACH ROW 

    WHEN 

        (NEW.id IS NULL) 

    BEGIN 

        SELECT feriado_id_seq.NEXTVAL INTO :NEW.id FROM DUAL; 

END;
CREATE SEQUENCE funcao_id_seq START WITH 1 INCREMENT BY 1; 

CREATE OR REPLACE TRIGGER funcao_id_seq_tr 

BEFORE INSERT ON funcao FOR EACH ROW 

    WHEN 

        (NEW.id IS NULL) 

    BEGIN 

        SELECT funcao_id_seq.NEXTVAL INTO :NEW.id FROM DUAL; 

END;
CREATE SEQUENCE profissional_id_seq START WITH 1 INCREMENT BY 1; 

CREATE OR REPLACE TRIGGER profissional_id_seq_tr 

BEFORE INSERT ON profissional FOR EACH ROW 

    WHEN 

        (NEW.id IS NULL) 

    BEGIN 

        SELECT profissional_id_seq.NEXTVAL INTO :NEW.id FROM DUAL; 

END;
CREATE SEQUENCE realizado_id_seq START WITH 1 INCREMENT BY 1; 

CREATE OR REPLACE TRIGGER realizado_id_seq_tr 

BEFORE INSERT ON realizado FOR EACH ROW 

    WHEN 

        (NEW.id IS NULL) 

    BEGIN 

        SELECT realizado_id_seq.NEXTVAL INTO :NEW.id FROM DUAL; 

END;
 