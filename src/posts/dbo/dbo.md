---
title: DBO
---

## Abstract

This NIH Pre-doctoral NRSA application proposes to investigate the relationship between the cell cycle and neural progenitor cell differentiation during neurodevelopment. Neural progenitor cells are essential for the development and repair of the nervous system, and their proper differentiation is crucial for normal brain function. While previous studies have shown that cell cycle progression is necessary for neural progenitor cell differentiation, the molecular mechanisms that regulate this process are poorly understood.

The proposed research will be conducted using a combination of in vitro and in vivo approaches, including primary neural progenitor cell culture, mouse models, and genetic manipulation techniques. The results of this study will not only provide new insights into the molecular mechanisms that regulate neural progenitor cell differentiation but also have broader implications for understanding the molecular basis of brain development and function.

The successful completion of this research will not only contribute to our understanding of the cell cycle and neural progenitor cell differentiation but also provide the applicant with valuable research training in molecular biology, neuroscience, and genetic manipulation techniques. This training will enable the applicant to pursue a successful career in academic research, with a focus on the molecular mechanisms that regulate neural development and function.

## Specific Aims (1 page)

**Aim 1**: Develop a set of molecular tools to assess cell cycle kinetics during CNS development along with integration with transcriptional state information at single-cell resolution.
This includes the integration of existing tracing tools, such as EdU pulse labeling, for scRNA-Seq and spatial transciptomics.

**Aim 2a**: Test the hypothesis that the specification of neuronal subtypes is differentially affected by the number and rate of neural progenitor divisions.
We will use the developed tools to assess the distribution of rates of the cell cycle during fate specification and its link to transcriptional signature.
We will perform the tracing over timepoints to quantify the baseline cell division rates and determine whether they are associated with specific fate decisions.

**Aim 2b**: Demonstrate the effect of cell cycle perturbation on fate specification using genetic and pharmacological approaches. We will assess changes in the expression of fate-determining transcription factors and evaluate the functional consequences of altered fate decisions using in vitro and in vivo assays.

## Research Strategy (6 pages, including figures and tables)

### Background and Significance (~1.5 pages)

Sketch briefly the background to the proposal. State concisely the importance of the research described in the proposal by relating the specific aims to broad, long-term objectives. Clearly relate the long-term objectives and theories to the specific hypotheses to be tested. Use this section to provide an account of any preliminary studies that might demonstrate the utility of the proposed project as a training experience.

The differentiation and proliferation of progenitor cells during the development of the central nervous system (CNS) is profoundly influenced by the fine manipulation and the spatial dynamics of the cell cycle (Hamburger, 1948; Kauffman, 1968; Merk, 1887; Sauer, 1935). The perturbation of which results in neurodevelopmental disorders, including microcephaly.

Cortical layers are patterned through an evolutionarily conserved inside-out mechanism — early-born neurons migrate from the proliferative neuroepithelium to occupy deep cortical layers, while late-born neurons move past the initial occupants of the cortical plate to populate more superficial layers (Berry and Rogers, 1965). Consequently, the precise timing of the cessation of cell division and the subsequent migration of cells as neurons (or glia) have been considered critical factors for establishing brain organization.

In recent years, the intricate integration of cell cycle regulation with neural progenitor specification has become increasingly evident, and the molecular mechanisms underlying this relationship have started to unfold.

We hypothesize that there is a link between fate specification and the number of cell divisions.

### Research Design and Methods (~4.5 pages)

### Aim 1: Development of Cell Cycle Tools

In order to gain high-resolution information regarding the relationship between the cell cycle and cell fate,
we rely primarily on combining current cell labeling techniques with genome-wide single-cell and spatial trancriptomics. Several labeling reagents are chosen based on their ability to complement each other. By varying the pulse-chase interval, we can infer cell cycle parameters.

Although integrating labeling reagents with transcriptomics method have been done, these on cell sorting to bin the cell population based on intensity, which is often limited to 4-6 bins [@luComprehensiveView2022] or single-cell sorting into wells which has throughput limitations.
Instead, we will use feature barcoding approaches to directly quantify the amount of labeling reagents alongside the cell's transcriptional state.
This greatly enhances the resolution of our analysis and is crucial for statistical model fitting [@hyrienMixtureModel2008].

#### CFSE

During development, neuroepithelial cells proliferate in the ventricular zone (VZ) that are adjacent to the ventricular lumen.
A hallmark feature is interkinetic nuclear migration,
in which the nuclei are translocated according to the cell cycle phase,
with the M phase occurring in the apical (luminal) zone while S-phase occurs in the basal (pial) zone [@kosodoRegulationInterkinetic2011].
Cells that are in the M-phase can be labelled by an intraventricular injection of carboxyfluorescein succinimide ester (CFSE) a cell-permeable, amine-reactive variant of fluorescein.
The short half-life and reactiveness of the dye functionally restricts pulse-labeling to juxtaventricular cells [@telleySequentialTranscriptional2016].
After an initial wash phase where fast cycling proteins are degraded, the fluorescence signal intensity is diluted by two-fold after each cell division.
Using this strategy, isochronic cohorts of VZ cells can be identified and tracked through their proliferation and differentiation. However, this fast kinetics also restricts labeling only juxtaventricular cells.

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
This differs substantially from the standard method of artificially binning the cell cycle into four phases.

### Aim 2a: Test the hypothesis that the specification of neuronal subtypes is differentially affected by the number and rate of neural progenitor divisions

#### Spatial Transcriptomics

However, this technique does not provide information about the spatial context of the cells, as the cells are dissociated and analyzed independently.

Spatial transcriptomics, on the other hand, allows for the identification and quantification of gene expression in situ within a tissue, providing information about the spatial distribution of gene expression. This technique enables the visualization of gene expression patterns within the context of the tissue, revealing insights into the spatial organization of cell types and cell-to-cell interactions.

By combining these two techniques, researchers can gain a more comprehensive understanding of gene expression in complex tissues. scRNA-seq can be used to identify cell types and gene expression signatures, while spatial transcriptomics can provide information about the spatial distribution of these signatures within the tissue. This approach can help identify cell-to-cell communication and signaling pathways that are important for normal tissue development and function, as well as for understanding how these processes may be disrupted in disease.

scRNA-seq provides an unbiased view of the transcriptome, albeit with high dropout rates. FISH-based techniques must be specified using probes but have >90% detection efficiency.

#### Tentative sequence for the investigation

•

We have preliminary data demonstrating the effectiveness of EdU-Seq and CFSE-Seq by proxy. Early EdU-Seq data demonstrate correlation with canonical

### Data analysis

We will integrate multi-omic data, gene expression measurements, intricate interrelated phenotypes, and the reconstruction of cellular histories to identify novel genes and processes associated with cell fate specification during corticogenesis. This approach will enable us to both implicate known pathways in specific cellular contexts and discover new functional groupings of co-regulated genes that affect the fate specification of distinct neuronal subtypes in relation to the impact of prolonged mitosis on microcephaly and associated developmental disorders.

Additionally, we will use our experience with latent space representations to develop analytic approaches that go beyond marker gene-based techniques. These analyses will enable a broader picture of cellular dynamics and provide a more comprehensive picture of the relationship between cellular divisions and progenitor competence at single cell resolution.

- Failure to

I have developed Samui Browser for the visualization of high-dimensional biological data. We also confirmed the chemistry of EdU-tagging with flow cytometry. A preliminary panel with MERFISH genes are ready

#### Anticipated problems that might arise and alternative plans to accomplish the specific aims if these problems arise

Whereas we have preliminary data for Aim 1,
