PRAGMA foreign_keys=OFF; 

CREATE TABLE agendamento( 
      contrato_id int   , 
      id  INTEGER    NOT NULL  , 
      profissional_id int   , 
      descricao text   NOT NULL  , 
      horario_inicial datetime   NOT NULL  , 
      intervalo_inicial datetime   , 
      intervalo_final datetime   , 
      horario_final datetime   NOT NULL  , 
      cor text   , 
      observacao text   , 
      tipo varchar  (1)   , 
      data_agenda date   , 
      hora_inicio text   , 
      hora_fim text   , 
      hora_intervalo_inicial text   , 
      hora_intervalo_final text   , 
      hora_total text   , 
      local char  (1)   , 
 PRIMARY KEY (id),
FOREIGN KEY(contrato_id) REFERENCES contrato(id),
FOREIGN KEY(profissional_id) REFERENCES profissional(id)) ; 

CREATE TABLE ausencias( 
      id  INTEGER    NOT NULL  , 
      profissional_id int   NOT NULL  , 
      descricao text   , 
      inicio datetime   , 
      final datetime   , 
 PRIMARY KEY (id),
FOREIGN KEY(profissional_id) REFERENCES profissional(id)) ; 

CREATE TABLE cidade( 
      id  INTEGER    NOT NULL  , 
      estado_id int   NOT NULL  , 
      nome text   NOT NULL  , 
 PRIMARY KEY (id),
FOREIGN KEY(estado_id) REFERENCES estado(id)) ; 

CREATE TABLE colaborador( 
      id  INTEGER    NOT NULL  , 
      nome text   NOT NULL  , 
      telefone varchar  (9)   , 
      whatsapp char  (1)   , 
      email text   , 
      funcao_id int   NOT NULL  , 
 PRIMARY KEY (id),
FOREIGN KEY(funcao_id) REFERENCES funcao(id)) ; 

CREATE TABLE contrato( 
      id  INTEGER    NOT NULL  , 
      empresa_id int   NOT NULL  , 
      descricao text   NOT NULL  , 
      dt_inicio date   NOT NULL  , 
      dt_fim date   NOT NULL  , 
      valor_hora double   , 
      cor text   , 
      valor_fixo double   , 
      tipo varchar  (1)   NOT NULL  , 
 PRIMARY KEY (id),
FOREIGN KEY(empresa_id) REFERENCES empresa(id)) ; 

CREATE TABLE contrato_item( 
      id  INTEGER    NOT NULL  , 
      contrato_id int   NOT NULL  , 
      dia_semana int   , 
      hora_inicio text   , 
      intervalo_ini text   , 
      intervalo_fim text   , 
      hora_final text   , 
      profissional_id int   , 
 PRIMARY KEY (id),
FOREIGN KEY(contrato_id) REFERENCES contrato(id),
FOREIGN KEY(profissional_id) REFERENCES profissional(id)) ; 

CREATE TABLE contrato_profissional( 
      id  INTEGER    NOT NULL  , 
      contrato_id int   NOT NULL  , 
      profissional_id int   NOT NULL  , 
 PRIMARY KEY (id),
FOREIGN KEY(contrato_id) REFERENCES contrato(id),
FOREIGN KEY(profissional_id) REFERENCES profissional(id)) ; 

CREATE TABLE empresa( 
      id  INTEGER    NOT NULL  , 
      nome text   NOT NULL  , 
      razao text   , 
      responsalvel text   , 
      cidade_id int   NOT NULL  , 
      endereco text   , 
      cor text   , 
 PRIMARY KEY (id),
FOREIGN KEY(cidade_id) REFERENCES cidade(id)) ; 

CREATE TABLE empresa_colaborador( 
      id  INTEGER    NOT NULL  , 
      empresa_id int   NOT NULL  , 
      colaborador_id int   NOT NULL  , 
 PRIMARY KEY (id),
FOREIGN KEY(colaborador_id) REFERENCES colaborador(id),
FOREIGN KEY(empresa_id) REFERENCES empresa(id)) ; 

CREATE TABLE estado( 
      id  INTEGER    NOT NULL  , 
      nome text   NOT NULL  , 
 PRIMARY KEY (id)) ; 

CREATE TABLE feriado( 
      id  INTEGER    NOT NULL  , 
      dt_feriado date   , 
      tipo char  (1)   , 
      descricao char  (30)   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE funcao( 
      id  INTEGER    NOT NULL  , 
      descricao text   NOT NULL  , 
 PRIMARY KEY (id)) ; 

CREATE TABLE profissional( 
      id  INTEGER    NOT NULL  , 
      nome text   NOT NULL  , 
      system_user_id int   NOT NULL  , 
 PRIMARY KEY (id)) ; 

CREATE TABLE realizado( 
      id  INTEGER    NOT NULL  , 
      contrato_id int   NOT NULL  , 
      profissional_id int   NOT NULL  , 
      descricao text   NOT NULL  , 
      inicio datetime   NOT NULL  , 
      inter_inicial datetime   , 
      inter_final datetime   , 
      fim datetime   NOT NULL  , 
      observacao text   , 
      horas double   , 
      agendamento_id int   , 
 PRIMARY KEY (id),
FOREIGN KEY(contrato_id) REFERENCES contrato(id),
FOREIGN KEY(profissional_id) REFERENCES profissional(id)) ; 

CREATE TABLE system_document( 
      id int   NOT NULL  , 
      category_id int   NOT NULL  , 
      system_user_id int   , 
      title text   NOT NULL  , 
      description text   , 
      submission_date date   , 
      archive_date date   , 
      filename text   , 
 PRIMARY KEY (id),
FOREIGN KEY(category_id) REFERENCES system_document_category(id),
FOREIGN KEY(system_user_id) REFERENCES system_users(id)) ; 

CREATE TABLE system_document_category( 
      id int   NOT NULL  , 
      name text   NOT NULL  , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_document_group( 
      id int   NOT NULL  , 
      document_id int   NOT NULL  , 
      system_group_id int   NOT NULL  , 
 PRIMARY KEY (id),
FOREIGN KEY(document_id) REFERENCES system_document(id),
FOREIGN KEY(system_group_id) REFERENCES system_group(id)) ; 

CREATE TABLE system_document_user( 
      id int   NOT NULL  , 
      document_id int   NOT NULL  , 
      system_user_id int   NOT NULL  , 
 PRIMARY KEY (id),
FOREIGN KEY(document_id) REFERENCES system_document(id),
FOREIGN KEY(system_user_id) REFERENCES system_users(id)) ; 

CREATE TABLE system_group( 
      id int   NOT NULL  , 
      name text   NOT NULL  , 
      uuid varchar  (36)   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_group_program( 
      id int   NOT NULL  , 
      system_group_id int   NOT NULL  , 
      system_program_id int   NOT NULL  , 
      actions text   , 
 PRIMARY KEY (id),
FOREIGN KEY(system_program_id) REFERENCES system_program(id),
FOREIGN KEY(system_group_id) REFERENCES system_group(id)) ; 

CREATE TABLE system_message( 
      id int   NOT NULL  , 
      system_user_id int   NOT NULL  , 
      system_user_to_id int   NOT NULL  , 
      subject text   NOT NULL  , 
      message text   , 
      dt_message datetime   , 
      checked char  (1)   , 
 PRIMARY KEY (id),
FOREIGN KEY(system_user_id) REFERENCES system_users(id),
FOREIGN KEY(system_user_to_id) REFERENCES system_users(id)) ; 

CREATE TABLE system_notification( 
      id int   NOT NULL  , 
      system_user_id int   NOT NULL  , 
      system_user_to_id int   NOT NULL  , 
      subject text   , 
      message text   , 
      dt_message datetime   , 
      action_url text   , 
      action_label text   , 
      icon text   , 
      checked char  (1)   , 
 PRIMARY KEY (id),
FOREIGN KEY(system_user_id) REFERENCES system_users(id),
FOREIGN KEY(system_user_to_id) REFERENCES system_users(id)) ; 

CREATE TABLE system_preference( 
      id varchar  (255)   NOT NULL  , 
      preference text   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_program( 
      id int   NOT NULL  , 
      name text   NOT NULL  , 
      controller text   NOT NULL  , 
      actions text   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_unit( 
      id int   NOT NULL  , 
      name text   NOT NULL  , 
      connection_name text   , 
 PRIMARY KEY (id)) ; 

CREATE TABLE system_user_group( 
      id int   NOT NULL  , 
      system_user_id int   NOT NULL  , 
      system_group_id int   NOT NULL  , 
 PRIMARY KEY (id),
FOREIGN KEY(system_group_id) REFERENCES system_group(id),
FOREIGN KEY(system_user_id) REFERENCES system_users(id)) ; 

CREATE TABLE system_user_program( 
      id int   NOT NULL  , 
      system_user_id int   NOT NULL  , 
      system_program_id int   NOT NULL  , 
 PRIMARY KEY (id),
FOREIGN KEY(system_program_id) REFERENCES system_program(id),
FOREIGN KEY(system_user_id) REFERENCES system_users(id)) ; 

CREATE TABLE system_users( 
      id int   NOT NULL  , 
      name text   NOT NULL  , 
      login text   NOT NULL  , 
      password text   NOT NULL  , 
      email text   , 
      frontpage_id int   , 
      system_unit_id int   , 
      active char  (1)   , 
      accepted_term_policy_at text   , 
      accepted_term_policy char  (1)   , 
      two_factor_enabled char  (1)     DEFAULT 'N', 
      two_factor_type varchar  (100)   , 
      two_factor_secret varchar  (255)   , 
 PRIMARY KEY (id),
FOREIGN KEY(system_unit_id) REFERENCES system_unit(id),
FOREIGN KEY(frontpage_id) REFERENCES system_program(id)) ; 

CREATE TABLE system_user_unit( 
      id int   NOT NULL  , 
      system_user_id int   NOT NULL  , 
      system_unit_id int   NOT NULL  , 
 PRIMARY KEY (id),
FOREIGN KEY(system_user_id) REFERENCES system_users(id),
FOREIGN KEY(system_unit_id) REFERENCES system_unit(id)) ; 

 
 CREATE UNIQUE INDEX unique_idx_profissional_system_user_id ON profissional(system_user_id);
 