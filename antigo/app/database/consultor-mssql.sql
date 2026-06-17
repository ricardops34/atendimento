CREATE TABLE agendamento( 
      contrato_id int   , 
      id  INT IDENTITY    NOT NULL  , 
      profissional_id int   , 
      descricao nvarchar(max)   NOT NULL  , 
      horario_inicial datetime2   NOT NULL  , 
      intervalo_inicial datetime2   , 
      intervalo_final datetime2   , 
      horario_final datetime2   NOT NULL  , 
      cor nvarchar(max)   , 
      observacao nvarchar(max)   , 
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
      id  INT IDENTITY    NOT NULL  , 
      profissional_id int   NOT NULL  , 
      descricao nvarchar(max)   , 
      inicio datetime2   , 
      final datetime2   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE cidade( 
      id  INT IDENTITY    NOT NULL  , 
      estado_id int   NOT NULL  , 
      nome nvarchar(max)   NOT NULL  , 
 PRIMARY KEY (id)) ; 

CREATE TABLE colaborador( 
      id  INT IDENTITY    NOT NULL  , 
      nome nvarchar(max)   NOT NULL  , 
      telefone varchar  (9)   , 
      whatsapp char  (1)   , 
      email nvarchar(max)   , 
      funcao_id int   NOT NULL  , 
 PRIMARY KEY (id)) ; 

CREATE TABLE contrato( 
      id  INT IDENTITY    NOT NULL  , 
      empresa_id int   NOT NULL  , 
      descricao nvarchar(max)   NOT NULL  , 
      dt_inicio date   NOT NULL  , 
      dt_fim date   NOT NULL  , 
      valor_hora float   , 
      cor nvarchar(max)   , 
      valor_fixo float   , 
      tipo varchar  (1)   NOT NULL  , 
 PRIMARY KEY (id)) ; 

CREATE TABLE contrato_item( 
      id  INT IDENTITY    NOT NULL  , 
      contrato_id int   NOT NULL  , 
      dia_semana int   , 
      hora_inicio time   , 
      intervalo_ini time   , 
      intervalo_fim time   , 
      hora_final time   , 
      profissional_id int   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE contrato_profissional( 
      id  INT IDENTITY    NOT NULL  , 
      contrato_id int   NOT NULL  , 
      profissional_id int   NOT NULL  , 
 PRIMARY KEY (id)) ; 

CREATE TABLE empresa( 
      id  INT IDENTITY    NOT NULL  , 
      nome nvarchar(max)   NOT NULL  , 
      razao nvarchar(max)   , 
      responsalvel nvarchar(max)   , 
      cidade_id int   NOT NULL  , 
      endereco nvarchar(max)   , 
      cor nvarchar(max)   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE empresa_colaborador( 
      id  INT IDENTITY    NOT NULL  , 
      empresa_id int   NOT NULL  , 
      colaborador_id int   NOT NULL  , 
 PRIMARY KEY (id)) ; 

CREATE TABLE estado( 
      id  INT IDENTITY    NOT NULL  , 
      nome nvarchar(max)   NOT NULL  , 
 PRIMARY KEY (id)) ; 

CREATE TABLE feriado( 
      id  INT IDENTITY    NOT NULL  , 
      dt_feriado date   , 
      tipo char  (1)   , 
      descricao char  (30)   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE funcao( 
      id  INT IDENTITY    NOT NULL  , 
      descricao nvarchar(max)   NOT NULL  , 
 PRIMARY KEY (id)) ; 

CREATE TABLE profissional( 
      id  INT IDENTITY    NOT NULL  , 
      nome nvarchar(max)   NOT NULL  , 
      system_user_id int   NOT NULL  , 
 PRIMARY KEY (id)) ; 

CREATE TABLE realizado( 
      id  INT IDENTITY    NOT NULL  , 
      contrato_id int   NOT NULL  , 
      profissional_id int   NOT NULL  , 
      descricao nvarchar(max)   NOT NULL  , 
      inicio datetime2   NOT NULL  , 
      inter_inicial datetime2   , 
      inter_final datetime2   , 
      fim datetime2   NOT NULL  , 
      observacao nvarchar(max)   , 
      horas float   , 
      agendamento_id int   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_document( 
      id int   NOT NULL  , 
      category_id int   NOT NULL  , 
      system_user_id int   , 
      title nvarchar(max)   NOT NULL  , 
      description nvarchar(max)   , 
      submission_date date   , 
      archive_date date   , 
      filename nvarchar(max)   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_document_category( 
      id int   NOT NULL  , 
      name nvarchar(max)   NOT NULL  , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_document_group( 
      id int   NOT NULL  , 
      document_id int   NOT NULL  , 
      system_group_id int   NOT NULL  , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_document_user( 
      id int   NOT NULL  , 
      document_id int   NOT NULL  , 
      system_user_id int   NOT NULL  , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_group( 
      id int   NOT NULL  , 
      name nvarchar(max)   NOT NULL  , 
      uuid varchar  (36)   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_group_program( 
      id int   NOT NULL  , 
      system_group_id int   NOT NULL  , 
      system_program_id int   NOT NULL  , 
      actions nvarchar(max)   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_message( 
      id int   NOT NULL  , 
      system_user_id int   NOT NULL  , 
      system_user_to_id int   NOT NULL  , 
      subject nvarchar(max)   NOT NULL  , 
      message nvarchar(max)   , 
      dt_message datetime2   , 
      checked char  (1)   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_notification( 
      id int   NOT NULL  , 
      system_user_id int   NOT NULL  , 
      system_user_to_id int   NOT NULL  , 
      subject nvarchar(max)   , 
      message nvarchar(max)   , 
      dt_message datetime2   , 
      action_url nvarchar(max)   , 
      action_label nvarchar(max)   , 
      icon nvarchar(max)   , 
      checked char  (1)   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_preference( 
      id varchar  (255)   NOT NULL  , 
      preference nvarchar(max)   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_program( 
      id int   NOT NULL  , 
      name nvarchar(max)   NOT NULL  , 
      controller nvarchar(max)   NOT NULL  , 
      actions nvarchar(max)   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_unit( 
      id int   NOT NULL  , 
      name nvarchar(max)   NOT NULL  , 
      connection_name nvarchar(max)   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_user_group( 
      id int   NOT NULL  , 
      system_user_id int   NOT NULL  , 
      system_group_id int   NOT NULL  , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_user_program( 
      id int   NOT NULL  , 
      system_user_id int   NOT NULL  , 
      system_program_id int   NOT NULL  , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_users( 
      id int   NOT NULL  , 
      name nvarchar(max)   NOT NULL  , 
      login nvarchar(max)   NOT NULL  , 
      password nvarchar(max)   NOT NULL  , 
      email nvarchar(max)   , 
      frontpage_id int   , 
      system_unit_id int   , 
      active char  (1)   , 
      accepted_term_policy_at nvarchar(max)   , 
      accepted_term_policy char  (1)   , 
      two_factor_enabled char  (1)     DEFAULT 'N', 
      two_factor_type varchar  (100)   , 
      two_factor_secret varchar  (255)   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_user_unit( 
      id int   NOT NULL  , 
      system_user_id int   NOT NULL  , 
      system_unit_id int   NOT NULL  , 
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
