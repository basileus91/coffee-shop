package com.coffeshop.app.web.rest;

import com.coffeshop.app.CoffeshopApp;
import com.coffeshop.app.domain.CoffeAmount;
import com.coffeshop.app.repository.CoffeAmountRepository;
import com.coffeshop.app.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.coffeshop.app.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link CoffeAmountResource} REST controller.
 */
@SpringBootTest(classes = CoffeshopApp.class)
public class CoffeAmountResourceIT {

    private static final Long DEFAULT_AVAILABLE_AMOUNT = 1L;
    private static final Long UPDATED_AVAILABLE_AMOUNT = 2L;

    private static final Long DEFAULT_SOKD_AMOUNT = 1L;
    private static final Long UPDATED_SOKD_AMOUNT = 2L;

    @Autowired
    private CoffeAmountRepository coffeAmountRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restCoffeAmountMockMvc;

    private CoffeAmount coffeAmount;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CoffeAmountResource coffeAmountResource = new CoffeAmountResource(coffeAmountRepository);
        this.restCoffeAmountMockMvc = MockMvcBuilders.standaloneSetup(coffeAmountResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CoffeAmount createEntity(EntityManager em) {
        CoffeAmount coffeAmount = new CoffeAmount()
            .availableAmount(DEFAULT_AVAILABLE_AMOUNT)
            .sokdAmount(DEFAULT_SOKD_AMOUNT);
        return coffeAmount;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CoffeAmount createUpdatedEntity(EntityManager em) {
        CoffeAmount coffeAmount = new CoffeAmount()
            .availableAmount(UPDATED_AVAILABLE_AMOUNT)
            .sokdAmount(UPDATED_SOKD_AMOUNT);
        return coffeAmount;
    }

    @BeforeEach
    public void initTest() {
        coffeAmount = createEntity(em);
    }

    @Test
    @Transactional
    public void createCoffeAmount() throws Exception {
        int databaseSizeBeforeCreate = coffeAmountRepository.findAll().size();

        // Create the CoffeAmount
        restCoffeAmountMockMvc.perform(post("/api/coffe-amounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(coffeAmount)))
            .andExpect(status().isCreated());

        // Validate the CoffeAmount in the database
        List<CoffeAmount> coffeAmountList = coffeAmountRepository.findAll();
        assertThat(coffeAmountList).hasSize(databaseSizeBeforeCreate + 1);
        CoffeAmount testCoffeAmount = coffeAmountList.get(coffeAmountList.size() - 1);
        assertThat(testCoffeAmount.getAvailableAmount()).isEqualTo(DEFAULT_AVAILABLE_AMOUNT);
        assertThat(testCoffeAmount.getSokdAmount()).isEqualTo(DEFAULT_SOKD_AMOUNT);
    }

    @Test
    @Transactional
    public void createCoffeAmountWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = coffeAmountRepository.findAll().size();

        // Create the CoffeAmount with an existing ID
        coffeAmount.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCoffeAmountMockMvc.perform(post("/api/coffe-amounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(coffeAmount)))
            .andExpect(status().isBadRequest());

        // Validate the CoffeAmount in the database
        List<CoffeAmount> coffeAmountList = coffeAmountRepository.findAll();
        assertThat(coffeAmountList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCoffeAmounts() throws Exception {
        // Initialize the database
        coffeAmountRepository.saveAndFlush(coffeAmount);

        // Get all the coffeAmountList
        restCoffeAmountMockMvc.perform(get("/api/coffe-amounts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(coffeAmount.getId().intValue())))
            .andExpect(jsonPath("$.[*].availableAmount").value(hasItem(DEFAULT_AVAILABLE_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].sokdAmount").value(hasItem(DEFAULT_SOKD_AMOUNT.intValue())));
    }
    
    @Test
    @Transactional
    public void getCoffeAmount() throws Exception {
        // Initialize the database
        coffeAmountRepository.saveAndFlush(coffeAmount);

        // Get the coffeAmount
        restCoffeAmountMockMvc.perform(get("/api/coffe-amounts/{id}", coffeAmount.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(coffeAmount.getId().intValue()))
            .andExpect(jsonPath("$.availableAmount").value(DEFAULT_AVAILABLE_AMOUNT.intValue()))
            .andExpect(jsonPath("$.sokdAmount").value(DEFAULT_SOKD_AMOUNT.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCoffeAmount() throws Exception {
        // Get the coffeAmount
        restCoffeAmountMockMvc.perform(get("/api/coffe-amounts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCoffeAmount() throws Exception {
        // Initialize the database
        coffeAmountRepository.saveAndFlush(coffeAmount);

        int databaseSizeBeforeUpdate = coffeAmountRepository.findAll().size();

        // Update the coffeAmount
        CoffeAmount updatedCoffeAmount = coffeAmountRepository.findById(coffeAmount.getId()).get();
        // Disconnect from session so that the updates on updatedCoffeAmount are not directly saved in db
        em.detach(updatedCoffeAmount);
        updatedCoffeAmount
            .availableAmount(UPDATED_AVAILABLE_AMOUNT)
            .sokdAmount(UPDATED_SOKD_AMOUNT);

        restCoffeAmountMockMvc.perform(put("/api/coffe-amounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCoffeAmount)))
            .andExpect(status().isOk());

        // Validate the CoffeAmount in the database
        List<CoffeAmount> coffeAmountList = coffeAmountRepository.findAll();
        assertThat(coffeAmountList).hasSize(databaseSizeBeforeUpdate);
        CoffeAmount testCoffeAmount = coffeAmountList.get(coffeAmountList.size() - 1);
        assertThat(testCoffeAmount.getAvailableAmount()).isEqualTo(UPDATED_AVAILABLE_AMOUNT);
        assertThat(testCoffeAmount.getSokdAmount()).isEqualTo(UPDATED_SOKD_AMOUNT);
    }

    @Test
    @Transactional
    public void updateNonExistingCoffeAmount() throws Exception {
        int databaseSizeBeforeUpdate = coffeAmountRepository.findAll().size();

        // Create the CoffeAmount

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCoffeAmountMockMvc.perform(put("/api/coffe-amounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(coffeAmount)))
            .andExpect(status().isBadRequest());

        // Validate the CoffeAmount in the database
        List<CoffeAmount> coffeAmountList = coffeAmountRepository.findAll();
        assertThat(coffeAmountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCoffeAmount() throws Exception {
        // Initialize the database
        coffeAmountRepository.saveAndFlush(coffeAmount);

        int databaseSizeBeforeDelete = coffeAmountRepository.findAll().size();

        // Delete the coffeAmount
        restCoffeAmountMockMvc.perform(delete("/api/coffe-amounts/{id}", coffeAmount.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CoffeAmount> coffeAmountList = coffeAmountRepository.findAll();
        assertThat(coffeAmountList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CoffeAmount.class);
        CoffeAmount coffeAmount1 = new CoffeAmount();
        coffeAmount1.setId(1L);
        CoffeAmount coffeAmount2 = new CoffeAmount();
        coffeAmount2.setId(coffeAmount1.getId());
        assertThat(coffeAmount1).isEqualTo(coffeAmount2);
        coffeAmount2.setId(2L);
        assertThat(coffeAmount1).isNotEqualTo(coffeAmount2);
        coffeAmount1.setId(null);
        assertThat(coffeAmount1).isNotEqualTo(coffeAmount2);
    }
}
