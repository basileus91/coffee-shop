package com.coffeshop.app.web.rest;

import com.coffeshop.app.domain.CoffeAmount;
import com.coffeshop.app.repository.CoffeAmountRepository;
import com.coffeshop.app.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.coffeshop.app.domain.CoffeAmount}.
 */
@RestController
@RequestMapping("/api")
public class CoffeAmountResource {

    private final Logger log = LoggerFactory.getLogger(CoffeAmountResource.class);

    private static final String ENTITY_NAME = "coffeAmount";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CoffeAmountRepository coffeAmountRepository;

    public CoffeAmountResource(CoffeAmountRepository coffeAmountRepository) {
        this.coffeAmountRepository = coffeAmountRepository;
    }

    /**
     * {@code POST  /coffe-amounts} : Create a new coffeAmount.
     *
     * @param coffeAmount the coffeAmount to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new coffeAmount, or with status {@code 400 (Bad Request)} if the coffeAmount has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/coffe-amounts")
    public ResponseEntity<CoffeAmount> createCoffeAmount(@RequestBody CoffeAmount coffeAmount) throws URISyntaxException {
        log.debug("REST request to save CoffeAmount : {}", coffeAmount);
        if (coffeAmount.getId() != null) {
            throw new BadRequestAlertException("A new coffeAmount cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CoffeAmount result = coffeAmountRepository.save(coffeAmount);
        return ResponseEntity.created(new URI("/api/coffe-amounts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /coffe-amounts} : Updates an existing coffeAmount.
     *
     * @param coffeAmount the coffeAmount to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated coffeAmount,
     * or with status {@code 400 (Bad Request)} if the coffeAmount is not valid,
     * or with status {@code 500 (Internal Server Error)} if the coffeAmount couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/coffe-amounts")
    public ResponseEntity<CoffeAmount> updateCoffeAmount(@RequestBody CoffeAmount coffeAmount) throws URISyntaxException {
        log.debug("REST request to update CoffeAmount : {}", coffeAmount);
        if (coffeAmount.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CoffeAmount result = coffeAmountRepository.save(coffeAmount);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, coffeAmount.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /coffe-amounts} : get all the coffeAmounts.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of coffeAmounts in body.
     */
    @GetMapping("/coffe-amounts")
    public List<CoffeAmount> getAllCoffeAmounts() {
        log.debug("REST request to get all CoffeAmounts");
        return coffeAmountRepository.findAll();
    }

    /**
     * {@code GET  /coffe-amounts/:id} : get the "id" coffeAmount.
     *
     * @param id the id of the coffeAmount to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the coffeAmount, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/coffe-amounts/{id}")
    public ResponseEntity<CoffeAmount> getCoffeAmount(@PathVariable Long id) {
        log.debug("REST request to get CoffeAmount : {}", id);
        Optional<CoffeAmount> coffeAmount = coffeAmountRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(coffeAmount);
    }

    /**
     * {@code DELETE  /coffe-amounts/:id} : delete the "id" coffeAmount.
     *
     * @param id the id of the coffeAmount to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/coffe-amounts/{id}")
    public ResponseEntity<Void> deleteCoffeAmount(@PathVariable Long id) {
        log.debug("REST request to delete CoffeAmount : {}", id);
        coffeAmountRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
