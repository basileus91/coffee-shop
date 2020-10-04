//package com.coffeshop.app.web.rest;
//
//import com.coffeshop.app.CoffeshopApp;
//import com.coffeshop.app.domain.OrderedCoffe;
//import com.coffeshop.app.repository.OrderedCoffeRepository;
//import com.coffeshop.app.service.MailService;
//import com.coffeshop.app.web.rest.errors.ExceptionTranslator;
//
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.MockitoAnnotations;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
//import org.springframework.http.MediaType;
//import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//import org.springframework.transaction.annotation.Transactional;
//import org.springframework.validation.Validator;
//
//import javax.persistence.EntityManager;
//import java.util.List;
//
//import static com.coffeshop.app.web.rest.TestUtil.createFormattingConversionService;
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.hamcrest.Matchers.hasItem;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
///**
// * Integration tests for the {@Link OrderedCoffeResource} REST controller.
// */
//@SpringBootTest(classes = CoffeshopApp.class)
//public class OrderedCoffeResourceIT {
//
//    private static final String DEFAULT_COFFE = "AAAAAAAAAA";
//    private static final String UPDATED_COFFE = "BBBBBBBBBB";
//
//    private static final String DEFAULT_CLIENT = "AAAAAAAAAA";
//    private static final String UPDATED_CLIENT = "BBBBBBBBBB";
//
//    private static final String DEFAULT_ORDER_ID = "AAAAAAAAAA";
//    private static final String UPDATED_ORDER_ID = "BBBBBBBBBB";
//
//    private static final Long DEFAULT_AMOUNT = 4L;
//    private static final Long UPDATED_AMOUNT = 4L;
//
//    @Autowired
//    private OrderedCoffeRepository orderedCoffeRepository;
//
//    @Autowired
//    private MappingJackson2HttpMessageConverter jacksonMessageConverter;
//
//    @Autowired
//    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;
//
//    @Autowired
//    private ExceptionTranslator exceptionTranslator;
//
//    @Autowired
//    private EntityManager em;
//
//    @Autowired
//    private Validator validator;
//
//    private MockMvc restOrderedCoffeMockMvc;
//
//    private OrderedCoffe orderedCoffe;
//
//    @BeforeEach
//    public void setup() {
//        MockitoAnnotations.initMocks(this);
//        MailService mailService = null;
//        final OrderedCoffeResource orderedCoffeResource = new OrderedCoffeResource(orderedCoffeRepository, mailService);
//        this.restOrderedCoffeMockMvc = MockMvcBuilders.standaloneSetup(orderedCoffeResource)
//            .setCustomArgumentResolvers(pageableArgumentResolver)
//            .setControllerAdvice(exceptionTranslator)
//            .setConversionService(createFormattingConversionService())
//            .setMessageConverters(jacksonMessageConverter)
//            .setValidator(validator).build();
//    }
//
//    /**
//     * Create an entity for this test.
//     *
//     * This is a static method, as tests for other entities might also need it,
//     * if they test an entity which requires the current entity.
//     */
//    public static OrderedCoffe createEntity(EntityManager em) {
//        OrderedCoffe orderedCoffe = new OrderedCoffe()
//            .coffe(DEFAULT_COFFE)
//            .client(DEFAULT_CLIENT)
//            .orderId(DEFAULT_ORDER_ID)
//            .amount(DEFAULT_AMOUNT);
//        return orderedCoffe;
//    }
//    /**
//     * Create an updated entity for this test.
//     *
//     * This is a static method, as tests for other entities might also need it,
//     * if they test an entity which requires the current entity.
//     */
//    public static OrderedCoffe createUpdatedEntity(EntityManager em) {
//        OrderedCoffe orderedCoffe = new OrderedCoffe()
//            .coffe(UPDATED_COFFE)
//            .client(UPDATED_CLIENT)
//            .orderId(UPDATED_ORDER_ID)
//            .amount(UPDATED_AMOUNT);
//        return orderedCoffe;
//    }
//
//    @BeforeEach
//    public void initTest() {
//        orderedCoffe = createEntity(em);
//    }
//
//    @Test
//    @Transactional
//    public void createOrderedCoffe() throws Exception {
//        int databaseSizeBeforeCreate = orderedCoffeRepository.findAll().size();
//
//        // Create the OrderedCoffe
//        restOrderedCoffeMockMvc.perform(post("/api/ordered-coffes")
//            .contentType(TestUtil.APPLICATION_JSON_UTF8)
//            .content(TestUtil.convertObjectToJsonBytes(orderedCoffe)))
//            .andExpect(status().isCreated());
//
//        // Validate the OrderedCoffe in the database
//        List<OrderedCoffe> orderedCoffeList = orderedCoffeRepository.findAll();
//        assertThat(orderedCoffeList).hasSize(databaseSizeBeforeCreate + 1);
//        OrderedCoffe testOrderedCoffe = orderedCoffeList.get(orderedCoffeList.size() - 1);
//        assertThat(testOrderedCoffe.getCoffe()).isEqualTo(DEFAULT_COFFE);
//        assertThat(testOrderedCoffe.getClient()).isEqualTo(DEFAULT_CLIENT);
//        assertThat(testOrderedCoffe.getOrderId()).isEqualTo(DEFAULT_ORDER_ID);
//        assertThat(testOrderedCoffe.getAmount()).isEqualTo(DEFAULT_AMOUNT);
//    }
//
//    @Test
//    @Transactional
//    public void createOrderedCoffeWithExistingId() throws Exception {
//        int databaseSizeBeforeCreate = orderedCoffeRepository.findAll().size();
//
//        // Create the OrderedCoffe with an existing ID
//        orderedCoffe.setId(1L);
//
//        // An entity with an existing ID cannot be created, so this API call must fail
//        restOrderedCoffeMockMvc.perform(post("/api/ordered-coffes")
//            .contentType(TestUtil.APPLICATION_JSON_UTF8)
//            .content(TestUtil.convertObjectToJsonBytes(orderedCoffe)))
//            .andExpect(status().isBadRequest());
//
//        // Validate the OrderedCoffe in the database
//        List<OrderedCoffe> orderedCoffeList = orderedCoffeRepository.findAll();
//        assertThat(orderedCoffeList).hasSize(databaseSizeBeforeCreate);
//    }
//
//
//    @Test
//    @Transactional
//    public void getAllOrderedCoffes() throws Exception {
//        // Initialize the database
//        orderedCoffeRepository.saveAndFlush(orderedCoffe);
//
//        // Get all the orderedCoffeList
//        restOrderedCoffeMockMvc.perform(get("/api/ordered-coffes?sort=id,desc"))
//            .andExpect(status().isOk())
//            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
//            .andExpect(jsonPath("$.[*].id").value(hasItem(orderedCoffe.getId().intValue())))
//            .andExpect(jsonPath("$.[*].coffe").value(hasItem(DEFAULT_COFFE.toString())))
//            .andExpect(jsonPath("$.[*].client").value(hasItem(DEFAULT_CLIENT.toString())))
//            .andExpect(jsonPath("$.[*].orderId").value(hasItem(DEFAULT_ORDER_ID.toString())))
//            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.toString())));
//    }
//
//    @Test
//    @Transactional
//    public void getOrderedCoffe() throws Exception {
//        // Initialize the database
//        orderedCoffeRepository.saveAndFlush(orderedCoffe);
//
//        // Get the orderedCoffe
//        restOrderedCoffeMockMvc.perform(get("/api/ordered-coffes/{id}", orderedCoffe.getId()))
//            .andExpect(status().isOk())
//            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
//            .andExpect(jsonPath("$.id").value(orderedCoffe.getId().intValue()))
//            .andExpect(jsonPath("$.coffe").value(DEFAULT_COFFE.toString()))
//            .andExpect(jsonPath("$.client").value(DEFAULT_CLIENT.toString()))
//            .andExpect(jsonPath("$.orderId").value(DEFAULT_ORDER_ID.toString()))
//            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.toString()));
//    }
//
//    @Test
//    @Transactional
//    public void getNonExistingOrderedCoffe() throws Exception {
//        // Get the orderedCoffe
//        restOrderedCoffeMockMvc.perform(get("/api/ordered-coffes/{id}", Long.MAX_VALUE))
//            .andExpect(status().isNotFound());
//    }
//
//    @Test
//    @Transactional
//    public void updateOrderedCoffe() throws Exception {
//        // Initialize the database
//        orderedCoffeRepository.saveAndFlush(orderedCoffe);
//
//        int databaseSizeBeforeUpdate = orderedCoffeRepository.findAll().size();
//
//        // Update the orderedCoffe
//        OrderedCoffe updatedOrderedCoffe = orderedCoffeRepository.findById(orderedCoffe.getId()).get();
//        // Disconnect from session so that the updates on updatedOrderedCoffe are not directly saved in db
//        em.detach(updatedOrderedCoffe);
//        updatedOrderedCoffe
//            .coffe(UPDATED_COFFE)
//            .client(UPDATED_CLIENT)
//            .orderId(UPDATED_ORDER_ID)
//            .amount(UPDATED_AMOUNT);
//
//        restOrderedCoffeMockMvc.perform(put("/api/ordered-coffes")
//            .contentType(TestUtil.APPLICATION_JSON_UTF8)
//            .content(TestUtil.convertObjectToJsonBytes(updatedOrderedCoffe)))
//            .andExpect(status().isOk());
//
//        // Validate the OrderedCoffe in the database
//        List<OrderedCoffe> orderedCoffeList = orderedCoffeRepository.findAll();
//        assertThat(orderedCoffeList).hasSize(databaseSizeBeforeUpdate);
//        OrderedCoffe testOrderedCoffe = orderedCoffeList.get(orderedCoffeList.size() - 1);
//        assertThat(testOrderedCoffe.getCoffe()).isEqualTo(UPDATED_COFFE);
//        assertThat(testOrderedCoffe.getClient()).isEqualTo(UPDATED_CLIENT);
//        assertThat(testOrderedCoffe.getOrderId()).isEqualTo(UPDATED_ORDER_ID);
//        assertThat(testOrderedCoffe.getAmount()).isEqualTo(UPDATED_AMOUNT);
//    }
//
//    @Test
//    @Transactional
//    public void updateNonExistingOrderedCoffe() throws Exception {
//        int databaseSizeBeforeUpdate = orderedCoffeRepository.findAll().size();
//
//        // Create the OrderedCoffe
//
//        // If the entity doesn't have an ID, it will throw BadRequestAlertException
//        restOrderedCoffeMockMvc.perform(put("/api/ordered-coffes")
//            .contentType(TestUtil.APPLICATION_JSON_UTF8)
//            .content(TestUtil.convertObjectToJsonBytes(orderedCoffe)))
//            .andExpect(status().isBadRequest());
//
//        // Validate the OrderedCoffe in the database
//        List<OrderedCoffe> orderedCoffeList = orderedCoffeRepository.findAll();
//        assertThat(orderedCoffeList).hasSize(databaseSizeBeforeUpdate);
//    }
//
//    @Test
//    @Transactional
//    public void deleteOrderedCoffe() throws Exception {
//        // Initialize the database
//        orderedCoffeRepository.saveAndFlush(orderedCoffe);
//
//        int databaseSizeBeforeDelete = orderedCoffeRepository.findAll().size();
//
//        // Delete the orderedCoffe
//        restOrderedCoffeMockMvc.perform(delete("/api/ordered-coffes/{id}", orderedCoffe.getId())
//            .accept(TestUtil.APPLICATION_JSON_UTF8))
//            .andExpect(status().isNoContent());
//
//        // Validate the database contains one less item
//        List<OrderedCoffe> orderedCoffeList = orderedCoffeRepository.findAll();
//        assertThat(orderedCoffeList).hasSize(databaseSizeBeforeDelete - 1);
//    }
//
//    @Test
//    @Transactional
//    public void equalsVerifier() throws Exception {
//        TestUtil.equalsVerifier(OrderedCoffe.class);
//        OrderedCoffe orderedCoffe1 = new OrderedCoffe();
//        orderedCoffe1.setId(1L);
//        OrderedCoffe orderedCoffe2 = new OrderedCoffe();
//        orderedCoffe2.setId(orderedCoffe1.getId());
//        assertThat(orderedCoffe1).isEqualTo(orderedCoffe2);
//        orderedCoffe2.setId(2L);
//        assertThat(orderedCoffe1).isNotEqualTo(orderedCoffe2);
//        orderedCoffe1.setId(null);
//        assertThat(orderedCoffe1).isNotEqualTo(orderedCoffe2);
//    }
//}
