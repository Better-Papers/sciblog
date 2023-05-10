---
title: DBO
---

## Abstract

Cortical development is a highly regulated process that relies on the precise control of the cell cycle to generate the appropriate number and types of neurons.
Genetic or environmental perturbations in the cell cycle of neural progenitor cells can influence their proliferation and fate specification,
with such dysregulation postulated as the primary cause of cortical malformations, such as prenatal microcephaly.
To gain a deeper understanding of the molecular mechanisms underlying the relationship between the cell cycle and differentiation, we intend to combine single-cell transcriptomics (scRNA-seq) methods with well-validated cell tracing techniques to comprehensively characterize cellular states across various developmental time periods.
More specifically, our aims are as follows:
**(Aim 1)**: Develop feature barcoding methods to integrate readouts from complementary cell tracing techniques into scRNA-seq assays.
Unlike existing methods that artificially separate cell populations into bins, our approach will directly quantify the amount of tracer in each cell,
significantly increasing resolution and enabling the use of more refined statistical models.
**(Aim 2a)**: Characterize the transcriptional state resulting in specification of neuronal subtypes as a function of the number and rate of neural progenitor divisions.
**(Aim 2b)**: Investigate the effect of alterations in mitotic length on changes in differentiation using heterochronic mouse models.
These combined approaches will enhance our understanding on the spatiotemporal heterogeneity of neural progenitor fate determination.

## Specific Aims (1 page)

Neurogenesis requires the precise orchestration of proliferation and differentiation, both of which are intimately related to the cell cycle.
This relationship is evident in the brain, where the cell cycle tends to lengthen on average as brain development progresses [@pontiCellCycle2013].
Moreover, acute lengthening of the cell cycle has been shown to disrupt neurogenesis, resulting in a reduced number of progenitor cells and altered cell fate specification, which are associated with neurodevelopmental and psychiatric disorders [@mitchell-dickAcuteLengthening2020].
Although the single-cell diversity of the developing cortex is becoming increasingly well characterized [@johnsonSinglecellAnalysis2015],
our understanding of how temporally progressing transcriptional state, particularly the cell cycle, generate the neuronal diversity remains limited.
A comprehensive understanding of transcriptional signature that controls the proliferation and differentiation of neural progenitor cells can pave the way for valuable insights into cortical development and its associated disorders.

Cell tracking and labeling assays are based on the timed introduction of tracers, such as nucleoside analogs incorporation and fluorescent dye dilution.
To integrate this information with the cell's transcriptiomic state, a common approach involves sorting cell populations based on fluorescence intensity of tracers prior to single-cell sequencing [@luComprehensiveView2022].
However, this method of artificially categorizing continuous cell populations into 4-6 bins inevitably leads to information loss and introduces bias [@trippeRandomizedGates2022].

Instead, we will leverage feature barcoding techniques to simultaneously measure the quantity of tracers and the cell's transcriptional state during single-cell sequencing.
This approach eliminates tracer quantization and significantly improves the resolution of our analysis, which is essential for accurate statistical model fitting and data interpretation [@hyrienMixtureModel2008].

**Aim 1**: Develop a set of molecular tools to explore the mechanism of neural progenitor fate specification as a function of the cell cycle.
This includes the integration of existing tracing tools, such as EdU pulse labeling, with scRNA-Seq through feature barcoding.

**Aim 2a**: Investigate how specification of neuronal subtypes is differentially affected by key parameters of the cell cycle, particularly the number and rate of neural progenitor divisions.
We will use the developed tools to assess the distribution of cell cycle rates during fate specification and how it relates to the cell's transcriptional signature over multiple time periods.

**Aim 2b**: Demonstrate the effect of cell cycle perturbation on fate specification using genetic and pharmacological approaches. We will assess changes in the expression of fate-determining transcription factors and evaluate the functional consequences of altered fate decisions using in vitro and in vivo assays.

How and when stochastic neurogenic decisions are made remains to be elucidated, but they likely depend on the influence of extrinsic and intrinsic signals on parameters such as cell cycle length, the asymmetric inheritance of cell components, the generation of dividing (IPCs) versus postmitotic progeny, and the membrane potential of progenitor cells

Cell tracking and labeling are accomplished through the timed introduction of tracers, such as the incorporation of nucleoside analogs and fluorescent dye dilution.

How do we generate cortical layers? We want to functionalize this dataset with actual cell behavior readout.

The development and patterning of the cerebral cortex is highly regulated.

There is significant heterogeneity [@ohnumaNeurogenesisCell2003; @llorcaStochasticFramework2019] The time at which the cell exits the cell cycle is its “birth date.” In most systems studied, there is a correlation between birth date and fate, giving rise to the process known as histogenesis
Single-cell analyses of neocortical progenitors revealed molecular and cellular heterogeneity [@yuzwaDevelopmentalEmergence2017; @johnsonSinglecellAnalysis2015].

Is a causal link between prolonged mitosis and altered neurogenesis evident in vivo? How do alterations in mitotic length drive rapid changes in differentiation?

Comparing the division history of neurons in the deep and upper layer of the developing mouse cortex revealed that, indeed, radial glia cells generating deep layer neurons divided less as compared to those generating upper layer neurons, supporting the current model (Gao et al., 2014). However, we observed a substantial amount of deep- and upper-layer neurons that showed the same green/red ratio and thus arose from radial glia cells that underwent the same amount of cell divisions. These findings indicate that not all radial glia cells first produce deep and, later, upper layer neurons, but rather suggests the existence of different radial glia cells being active at different times during development.

APs can revert their temporal identity and re-enter past molecular states to once again generate normally earlier-born neurons. By contrast, late-born IPs are committed progenitors that lack such fate plasticity. These results highlight an unexpected cell-type-specific diversity in the temporal plasticity [@oberstTemporalPlasticity2019]

## Research Strategy (6 pages, including figures and tables)

### Background and Significance (~1.5 pages)

Sketch briefly the background to the proposal. State concisely the importance of the research described in the proposal by relating the specific aims to broad, long-term objectives. Clearly relate the long-term objectives and theories to the specific hypotheses to be tested. Use this section to provide an account of any preliminary studies that might demonstrate the utility of the proposed project as a training experience.

The differentiation and proliferation of progenitor cells during the development of the central nervous system (CNS) is profoundly influenced by the fine manipulation and the spatial dynamics of the cell cycle (Hamburger, 1948; Kauffman, 1968; Merk, 1887; Sauer, 1935). The perturbation of which results in neurodevelopmental disorders, including microcephaly.

Cortical layers are patterned through an evolutionarily conserved inside-out mechanism — early-born neurons migrate from the proliferative neuroepithelium to occupy deep cortical layers, while late-born neurons move past the initial occupants of the cortical plate to populate more superficial layers (Berry and Rogers, 1965). Consequently, the precise timing of the cessation of cell division and the subsequent migration of cells as neurons (or glia) have been considered critical factors for establishing brain organization.

In recent years, the intricate integration of cell cycle regulation with neural progenitor specification has become increasingly evident, and the molecular mechanisms underlying this relationship have started to unfold.

Neocortical maturation starts at about day 16 of gestation in humans [16] and embryonic day (E) 7 in rodents, with neurulation followed by regional specification and expansion of the PFC. The process is controlled by intrinsic transcription factors and extrinsic growth factors that tightly interact to delimit the prefrontal boundaries [17]. Once the neural tube is formed, at around 5 weeks of gestation in humans and E10 in rodents, neurons destined to form the neocortex are born as neuroblasts. Their proliferation is a long-lasting process with an area-specific dynamic that generally peaks between 6 and 18 weeks gestation in humans [18] and E10 and E15 in rodents [19]. Excitatory neurons are generated from apical progenitors located in the ventricular zone as result of a complex interplay of cell-autonomous mechanisms and local and long-range environmental cues [20,21]. Towards the end of the neurogenic period, glial cells are generated [22].

Progenitors can output heterogeneous neuronal populations [@llorcaStochasticFramework2019].

Cell fate decisions are tightly linked to cell cycle [@pauklinCellcycleState2013].
This fact is in agreement with the the stem cell literature that that differentiation is correlated with cell cycle lengthening, particularly during the G1 phase [@langeCdksCyclins2010].

Background technology.

### Research Design and Methods (~4.5 pages)

Although integrating labeling reagents with transcriptomics method have been done, these rely on cell sorting to bin the cell population based on intensity, which is often limited to 4-6 bins [@luComprehensiveView2022] or single-cell sorting into wells which has throughput limitations.
Instead, we will use feature barcoding approaches to directly quantify the amount of labeling reagents alongside the cell's transcriptional state.
This greatly enhances the resolution of our analysis and is crucial for statistical model fitting [@hyrienMixtureModel2008].

### Aim 1: Development of Cell Cycle Profiling Tools

In order to gain high-resolution information regarding the relationship between the cell cycle and cell fate,
we rely primarily on combining current cell labeling techniques with genome-wide single-cell and spatial trancriptomics.
Several labeling reagents are chosen based on their ability to complement each other. By varying the pulse-chase interval, we can infer cell cycle parameters.

#### CFSE

During development, neuroepithelial cells proliferate in the ventricular zone (VZ) that are adjacent to the ventricular lumen.
A hallmark feature is interkinetic nuclear migration,
in which the nuclei are translocated according to the cell cycle phase,
with the M phase occurring in the apical (luminal) zone while S-phase occurs in the basal (pial) zone [@kosodoRegulationInterkinetic2011].
Cells that are in the M-phase can be labelled by an intraventricular injection of carboxyfluorescein succinimide ester (CFSE) a cell-permeable, amine-reactive variant of fluorescein.
The short half-life and reactiveness of the dye functionally restricts pulse-labeling to juxtaventricular cells [@telleySequentialTranscriptional2016].
After an initial wash phase where fast cycling proteins are degraded, the fluorescence signal intensity is diluted by two-fold after each cell division.
Using this strategy, isochronic cohorts of VZ cells can be identified and tracked through their proliferation and differentiation. However, this fast kinetics also restricts labeling only juxtaventricular cells. This approach has been used to visualize the migration profile of different cohorts.

#### EdU

Ethynyl uridine (EdU) is a nucleoside analog that is incorporated into the cell's DNA during the S phase and is widely used for proliferation tracking. The ethynyl group can be reacted or clicked to an azide group in a CuAAC bioorthogonal reaction. This is significantly simpler than BrdU, which necessitates the use of heat denaturation and anti-BrdU labeling.
EdU can be injected system-wide through an interperitoneal injection, albeit at a lower time resolution than that of CFSE.
EdU is also known to be cytotoxic and can trigger mitotic arrest though DNA repair pathways [@ligasovaFatalCombination2015].
Therefore, we plan to use _f-ara_-EdU, a significantly less toxic variant of EdU for our studies [@neefDynamicMetabolic2011].

#### iCOUNT

The inducible cell division counter (iCOUNT) method relies on recombination-induced tag exchange (RITE) of endogenously tagged long-lived proteins to fluorescent proteins to track the number of cell divisions [@denoth-lippunerVisualizationIndividual2021].
In this case, histone variant H3.1 is tagged with mCherry and would switch to EGFP upon Cre activation.
Then, every subsequent cell division would reduce the amount H3.1-mCherry by half
as new H3.1-EGFP is produced to refill the pool of histones.
By comparing the ratio between mCherry and EGFP, we can infer the number of cell cycles since Cre activation.
This approach provides several benefits compared to previous methods, including integrated signal normalization.
The authors claimed that this method can count up to 3-4 cell divisions _in vivo_. iCOUNT mice are now commercially available and our collaborator, Dr. Dwight Bergles, already has them expanding in his colonies.

<figure>

![](./icountdiagram.png)

<figcaption>

Figure 1b from [@denoth-lippunerVisualizationIndividual2021]

</figcaption>

</figure>

#### Combining Labeling with Transcriptomics

These labeling strategies have given us a wealth of information but their utility could be much greater if combined with other modalities.
Current studies utilizing these labeling strategies are generally limited to imaging in conjunction with immunofluorescence labeling [@telleySequentialTranscriptional2016], cell sorting [@luComprehensiveView2022], and a limited set of genes using FISH [@westSpatiotemporalPatterns2022].

In order to combine these labeling strategies with scRNA-Seq methods, we need to label these tags with oligonucleotides.
We have designed an assay in which biotin azide is clicked on to EdU and subsequently detected with oligonucleotide-conjugated streptavidin. CFSE can be labeled with anti-FITC antibodies with good efficacy [@goodProliferationTracing2019].
We have preliminary data demonstrating the detection of oligonucleotide-tagged EdU along with flow cytometric detection of oligonucleotide-conjugated antibodies to CFSE.
iCOUNT markers mCherry and EGFP can also be labeled with their respective antibodies.
This oligonucleotide conjugation technique could also be applied to other transcriptome-wide techniques, such as FISH.

#### Validation

We will perform validation of these labeling techniques using _in vitro_ cell culture experiment with the HEK293T and Jurkat cell lines. To establish the ground truth of cell cycle parameters, we will employ the Fluorescent Ubiquitination-based Cell Cycle Indicator (FUCCI) [@bajarFluorescentIndicators2016] in a live cell imaging experiment. This system has been established in the lab.

To determine the senstivity of the detection of the change in rate, we will pulse cells with EdU/CFSE alongside with pharmacological agents that perturb the cell cycle, such as hydroxyurea and etoposide.
We will collect the cells for sequencing after several chase intervals.
With a mathematical model, CycleFlow [@jollyCycleFlowSimultaneously2022], the parameters of the cell cycle, including its rate, can be calculated with Bayesian methods.

This would be done in concordance with the tricycle algorithm, which phases the position a cell is in its cell cycle from its transcriptional state [@zhengUniversalPrediction2022].
This differs substantially from the standard method of artificially binning the cell cycle into four phases and analyzing them separately.

#### Anticipated problems that might arise and alternative plans to accomplish the specific aims if these problems arise

I have successfully tested various aspects of the assays mentioned in Aim 1 _in vitro_.
If the described labeling approaches can not be used _in vivo_, we can fallback to using only fluorescent reporters alongside FISH.

### Aim 2a: Test how specification of neuronal subtypes is differentially affected by the number and rate of neural progenitor division

Get parameters for cell cycle model.
Single-molecule fluorescence in situ hybridization (smFISH) is [@rajImagingIndividual2008]
I also have successfully designed and executed a pilot MERFISH experiment. Pan

Cell autonomous from transplant experiment. Data from migrating cells. Organization of

However, this technique does not provide information about the spatial context of the cells, as the cells are dissociated and analyzed independently. Due to IKN, gaining spatial context is useful. Transcriptomic state.

List of differential genes in different phases of the cell cycle, linked to fate specification.

Spatial transcriptomics, on the other hand, allows for the identification and quantification of gene expression in situ within a tissue, providing information about the spatial distribution of gene expression. This technique enables the visualization of gene expression patterns within the context of the tissue, revealing insights into the spatial organization of cell types and cell-to-cell interactions.

By combining these two techniques, researchers can gain a more comprehensive understanding of gene expression in complex tissues. scRNA-seq can be used to identify cell types and gene expression signatures, while spatial transcriptomics can provide information about the spatial distribution of these signatures within the tissue. This approach can help identify cell-to-cell communication and signaling pathways that are important for normal tissue development and function, as well as for understanding how these processes may be disrupted in disease.

scRNA-seq provides an unbiased view of the transcriptome, albeit with high dropout rates. FISH-based techniques must be specified using probes but have >90% detection efficiency.

Tricycle phase of cells from published data.

There are fast cyclers and slow cyclers and we want to know what the differences are between them. We know that

Sox9 case, heterogeneity within progenitor population. We want to screen all the genes at once.

Test whether we rediscover Sox9 as a difference factor.

This is FlashTag with sequencing, tie the amount to individual cells.

We can just sort the cells.

Birthdating cells and correlate with transcriptional data.

### Aim 2b: Demonstrate the effect of cell cycle perturbation on fate specification using genetic and pharmacological approaches

### Tentative sequence for the investigation

#### Year 1 (Present - December 2023)

I plan to complete the primary development and _in vitro_ characterization of assays described under Aim 1.

#### Year 2 (January - December 2024)

After gaining broad understanding of the assays and their properties, I will begin Aim 2A and 2B of my research plan.
I will utilize the Pantr2

#### Year 3 (January 2025 - ~June 2025) Anticipated year of graduation

### Data analysis

Input, output. of each cell

We will integrate multi-omic data, gene expression measurements, intricate interrelated phenotypes, and the reconstruction of cellular histories to identify novel genes and processes associated with cell fate specification during corticogenesis. This approach will enable us to both implicate known pathways in specific cellular contexts and discover new functional groupings of co-regulated genes that affect the fate specification of distinct neuronal subtypes in relation to the impact of prolonged mitosis on microcephaly and associated developmental disorders.

Additionally, we will use our experience with latent space representations to develop analytic approaches that go beyond marker gene-based techniques. These analyses will enable a broader picture of cellular dynamics and provide a more comprehensive picture of the relationship between cellular divisions and progenitor competence at single cell resolution.

- Failure to

I have developed Samui Browser for the visualization of high-dimensional biological data. We also confirmed the chemistry of EdU-tagging with flow cytometry. A preliminary panel with MERFISH genes are ready
