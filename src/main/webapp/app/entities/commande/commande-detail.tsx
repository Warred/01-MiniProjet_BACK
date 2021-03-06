import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './commande.reducer';
import { ICommande } from 'app/shared/model/commande.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICommandeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CommandeDetail = (props: ICommandeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { commandeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="commerceApp.commande.detail.title">Commande</Translate> [<b>{commandeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="date">
              <Translate contentKey="commerceApp.commande.date">Date</Translate>
            </span>
          </dt>
          <dd>{commandeEntity.date ? <TextFormat value={commandeEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="moyentPaiement">
              <Translate contentKey="commerceApp.commande.moyentPaiement">Moyent Paiement</Translate>
            </span>
          </dt>
          <dd>{commandeEntity.moyentPaiement}</dd>
          <dt>
            <span id="statutCommande">
              <Translate contentKey="commerceApp.commande.statutCommande">Statut Commande</Translate>
            </span>
          </dt>
          <dd>{commandeEntity.statutCommande}</dd>
          <dt>
            <span id="total">
              <Translate contentKey="commerceApp.commande.total">Total</Translate>
            </span>
          </dt>
          <dd>{commandeEntity.total}</dd>
          <dt>
            <Translate contentKey="commerceApp.commande.client">Client</Translate>
          </dt>
          <dd>{commandeEntity.clientId ? commandeEntity.clientId : ''}</dd>
        </dl>
        <Button tag={Link} to="/commande" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/commande/${commandeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ commande }: IRootState) => ({
  commandeEntity: commande.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CommandeDetail);
