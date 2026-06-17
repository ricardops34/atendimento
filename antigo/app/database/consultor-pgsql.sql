CREATE TABLE agendamento( 
      contrato_id integer   , 
      id  SERIAL    NOT NULL  , 
      profissional_id integer   , 
      descricao text   NOT NULL  , 
      horario_inicial timestamp   NOT NULL  , 
      intervalo_inicial timestamp   , 
      intervalo_final timestamp   , 
      horario_final timestamp   NOT NULL  , 
      cor text   , 
      observacao text   , 
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
      id  SERIAL    NOT NULL  , 
      profissional_id integer   NOT NULL  , 
      descricao text   , 
      inicio timestamp   , 
      final timestamp   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE cidade( 
      id  SERIAL    NOT NULL  , 
      estado_id integer   NOT NULL  , 
      nome text   NOT NULL  , 
 PRIMARY KEY (id)) ; 

CREATE TABLE colaborador( 
      id  SERIAL    NOT NULL  , 
      nome text   NOT NULL  , 
      telefone varchar  (9)   , 
      whatsapp char  (1)   , 
      email text   , 
      funcao_id integer   NOT NULL  , 
 PRIMARY KEY (id)) ; 

CREATE TABLE contrato( 
      id  SERIAL    NOT NULL  , 
      empresa_id integer   NOT NULL  , 
      descricao text   NOT NULL  , 
      dt_inicio date   NOT NULL  , 
      dt_fim date   NOT NULL  , 
      valor_hora float   , 
      cor text   , 
      valor_fixo float   , 
      tipo varchar  (1)   NOT NULL  , 
 PRIMARY KEY (id)) ; 

CREATE TABLE contrato_item( 
      id  SERIAL    NOT NULL  , 
      contrato_id integer   NOT NULL  , 
      dia_semana integer   , 
      hora_inicio time   , 
      intervalo_ini time   , 
      intervalo_fim time   , 
      hora_final time   , 
      profissional_id integer   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE contrato_profissional( 
      id  SERIAL    NOT NULL  , 
      contrato_id integer   NOT NULL  , 
      profissional_id integer   NOT NULL  , 
 PRIMARY KEY (id)) ; 

CREATE TABLE empresa( 
      id  SERIAL    NOT NULL  , 
      nome text   NOT NULL  , 
      razao text   , 
      responsalvel text   , 
      cidade_id integer   NOT NULL  , 
      endereco text   , 
      cor text   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE empresa_colaborador( 
      id  SERIAL    NOT NULL  , 
      empresa_id integer   NOT NULL  , 
      colaborador_id integer   NOT NULL  , 
 PRIMARY KEY (id)) ; 

CREATE TABLE estado( 
      id  SERIAL    NOT NULL  , 
      nome text   NOT NULL  , 
 PRIMARY KEY (id)) ; 

CREATE TABLE feriado( 
      id  SERIAL    NOT NULL  , 
      dt_feriado date   , 
      tipo char  (1)   , 
      descricao char  (30)   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE funcao( 
      id  SERIAL    NOT NULL  , 
      descricao text   NOT NULL  , 
 PRIMARY KEY (id)) ; 

CREATE TABLE profissional( 
      id  SERIAL    NOT NULL  , 
      nome text   NOT NULL  , 
      system_user_id integer   NOT NULL  , 
 PRIMARY KEY (id)) ; 

CREATE TABLE realizado( 
      id  SERIAL    NOT NULL  , 
      contrato_id integer   NOT NULL  , 
      profissional_id integer   NOT NULL  , 
      descricao text   NOT NULL  , 
      inicio timestamp   NOT NULL  , 
      inter_inicial timestamp   , 
      inter_final timestamp   , 
      fim timestamp   NOT NULL  , 
      observacao text   , 
      horas float   , 
      agendamento_id integer   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_document( 
      id integer   NOT NULL  , 
      category_id integer   NOT NULL  , 
      system_user_id integer   , 
      title text   NOT NULL  , 
      description text   , 
      submission_date date   , 
      archive_date date   , 
      filename text   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_document_category( 
      id integer   NOT NULL  , 
      name text   NOT NULL  , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_document_group( 
      id integer   NOT NULL  , 
      document_id integer   NOT NULL  , 
      system_group_id integer   NOT NULL  , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_document_user( 
      id integer   NOT NULL  , 
      document_id integer   NOT NULL  , 
      system_user_id integer   NOT NULL  , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_group( 
      id integer   NOT NULL  , 
      name text   NOT NULL  , 
      uuid varchar  (36)   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_group_program( 
      id integer   NOT NULL  , 
      system_group_id integer   NOT NULL  , 
      system_program_id integer   NOT NULL  , 
      actions text   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_message( 
      id integer   NOT NULL  , 
      system_user_id integer   NOT NULL  , 
      system_user_to_id integer   NOT NULL  , 
      subject text   NOT NULL  , 
      message text   , 
      dt_message timestamp   , 
      checked char  (1)   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_notification( 
      id integer   NOT NULL  , 
      system_user_id integer   NOT NULL  , 
      system_user_to_id integer   NOT NULL  , 
      subject text   , 
      message text   , 
      dt_message timestamp   , 
      action_url text   , 
      action_label text   , 
      icon text   , 
      checked char  (1)   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_preference( 
      id varchar  (255)   NOT NULL  , 
      preference text   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_program( 
      id integer   NOT NULL  , 
      name text   NOT NULL  , 
      controller text   NOT NULL  , 
      actions text   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_unit( 
      id integer   NOT NULL  , 
      name text   NOT NULL  , 
      connection_name text   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_user_group( 
      id integer   NOT NULL  , 
      system_user_id integer   NOT NULL  , 
      system_group_id integer   NOT NULL  , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_user_program( 
      id integer   NOT NULL  , 
      system_user_id integer   NOT NULL  , 
      system_program_id integer   NOT NULL  , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_users( 
      id integer   NOT NULL  , 
      name text   NOT NULL  , 
      login text   NOT NULL  , 
      password text   NOT NULL  , 
      email text   , 
      frontpage_id integer   , 
      system_unit_id integer   , 
      active char  (1)   , 
      accepted_term_policy_at text   , 
      accepted_term_policy char  (1)   , 
      two_factor_enabled char  (1)     DEFAULT 'N', 
      two_factor_type varchar  (100)   , 
      two_factor_secret varchar  (255)   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_user_unit( 
      id integer   NOT NULL  , 
      system_user_id integer   NOT NULL  , 
      system_unit_id integer   NOT NULL  , 
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
 
 CREATE index idx_agendamento_contrato_id on agendamento(contrato_id); 
CREATE index idx_agendamento_profissional_id on agendamento(profissional_id); 
CREATE index idx_ausencias_profissional_id on ausencias(profissional_id); 
CREATE index idx_cidade_estado_id on cidade(estado_id); 
CREATE index idx_colaborador_funcao_id on colaborador(funcao_id); 
CREATE index idx_contrato_empresa_id on contrato(empresa_id); 
CREATE index idx_contrato_item_contrato_id on contrato_item(contrato_id); 
CREATE index idx_contrato_item_profissional_id on contrato_item(profissional_id); 
CREATE index idx_contrato_profissional_contrato_id on contrato_profissional(contrato_id); 
CREATE index idx_contrato_profissional_profissional_id on contrato_profissional(profissional_id); 
CREATE index idx_empresa_cidade_id on empresa(cidade_id); 
CREATE index idx_empresa_colaborador_colaborador_id on empresa_colaborador(colaborador_id); 
CREATE index idx_empresa_colaborador_empresa_id on empresa_colaborador(empresa_id); 
CREATE index idx_realizado_contrato_id on realizado(contrato_id); 
CREATE index idx_realizado_profissional_id on realizado(profissional_id); 
CREATE index idx_system_document_category_id on system_document(category_id); 
CREATE index idx_system_document_system_user_id on system_document(system_user_id); 
CREATE index idx_system_document_group_document_id on system_document_group(document_id); 
CREATE index idx_system_document_group_system_group_id on system_document_group(system_group_id); 
CREATE index idx_system_document_user_document_id on system_document_user(document_id); 
CREATE index idx_system_document_user_system_user_id on system_document_user(system_user_id); 
CREATE index idx_system_group_program_system_program_id on system_group_program(system_program_id); 
CREATE index idx_system_group_program_system_group_id on system_group_program(system_group_id); 
CREATE index idx_system_message_system_user_id on system_message(system_user_id); 
CREATE index idx_system_message_system_user_to_id on system_message(system_user_to_id); 
CREATE index idx_system_notification_system_user_id on system_notification(system_user_id); 
CREATE index idx_system_notification_system_user_to_id on system_notification(system_user_to_id); 
CREATE index idx_system_user_group_system_group_id on system_user_group(system_group_id); 
CREATE index idx_system_user_group_system_user_id on system_user_group(system_user_id); 
CREATE index idx_system_user_program_system_program_id on system_user_program(system_program_id); 
CREATE index idx_system_user_program_system_user_id on system_user_program(system_user_id); 
CREATE index idx_system_users_system_unit_id on system_users(system_unit_id); 
CREATE index idx_system_users_frontpage_id on system_users(frontpage_id); 
CREATE index idx_system_user_unit_system_user_id on system_user_unit(system_user_id); 
CREATE index idx_system_user_unit_system_unit_id on system_user_unit(system_unit_id); 
